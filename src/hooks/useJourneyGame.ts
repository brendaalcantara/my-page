"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  ANIMATIONS,
  CANVAS_W,
  CANVAS_H,
  CHAR_H,
  CHAR_W,
  GRAVITY,
  RUN_SPEED,
  JUMP_VEL,
  ANIM_FRAMES,
  ANIM_SPEED,
  PLAYER_MAX_HP,
  INVINCIBLE_MS,
  BADGE_R,
  BADGE_LABELS,
  ENEMY_SIZE,
  ENEMY_DEATH_DURATION,
  KNOCKBACK_VX,
  STOMP_BOUNCE_FACTOR,
  BADGE_HEAL_HP,
  MAX_FRAME_DT,
  TARGET_FRAME_MS,
  LEVELS,
  spawnEnemies,
} from "@/components/game/gameLevels";
import {
  drawBadgeIcon,
  drawEnemy,
  renderStartScreen,
  renderGameOverScreen,
  drawBackground,
  drawAllPlatforms,
  drawPlayer,
  drawNextLevelArrow,
  renderFinaleScreen,
  drawCollectFx,
} from "@/components/game/gameRenderers";
import type { AnimState, PlayerState, LiveEnemy, FinaleTexts } from "@/components/game/gameTypes";

export const FINALE_IDX = LEVELS.length - 1;

export function useJourneyGame() {
  const { t } = useLanguage();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const gameStartedRef = useRef(false);

  const keysRef = useRef<Set<string>>(new Set());
  const touchRef = useRef<{ left: boolean; right: boolean; jump: boolean; down: boolean }>({
    left: false,
    right: false,
    jump: false,
    down: false,
  });
  const playerRef = useRef<PlayerState>({
    x: 100,
    y: 0,
    vx: 0,
    vy: 0,
    grounded: false,
    facingLeft: false,
    anim: "idle",
    frame: 0,
    frameTimer: 0,
    hp: PLAYER_MAX_HP,
    maxHp: PLAYER_MAX_HP,
    invincible: 0,
  });
  const levelRef = useRef(0);
  const bgImagesRef = useRef<(HTMLImageElement | null)[]>(LEVELS.map(() => null));
  const spriteFramesRef = useRef<Record<AnimState, HTMLImageElement[]>>({
    idle: [],
    run: [],
    jump: [],
  });
  const floorRef = useRef<{ left: HTMLImageElement | null; mid: HTMLImageElement | null; right: HTMLImageElement | null }>({
    left: null,
    mid: null,
    right: null,
  });
  const meliBadgeRef = useRef<HTMLImageElement | null>(null);
  const rafRef = useRef(0);
  const lastTimeRef = useRef(0);
  const transitionRef = useRef(false);
  // Refs for cleanup of transition timers on unmount (#1)
  const outerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const innerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [collectedBadges, setCollectedBadges] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem("journey-badges");
      if (saved) return new Set<number>(JSON.parse(saved));
    } catch {}
    return new Set();
  });
  const collectedRef = useRef<Set<number>>(collectedBadges);
  const collectFxRef = useRef<{ x: number; y: number; elapsed: number } | null>(null);
  const gameCompleteRef = useRef(false);
  const [gameOver, setGameOver] = useState(false);
  const gameOverRef = useRef(false);
  const finaleTextsRef = useRef<FinaleTexts>({
    complete: "", badges: "", forNow: "", gameOver: "",
    playAgain: "", tryAgain: "", reset: "", terminalTitle: "",
    startTitle: "", startSubtitle: "", startButton: "", startHint: "",
    enemies: {},
    badgeLabels: BADGE_LABELS as string[],
  });
  const enemiesRef = useRef<LiveEnemy[]>([]);

  // Image loading effect
  useEffect(() => {
    const animKeys: AnimState[] = ["idle", "run", "jump"];
    for (const key of animKeys) {
      const paths = ANIMATIONS[key];
      const imgs: HTMLImageElement[] = [];
      for (const src of paths) {
        const img = new Image();
        img.src = src;
        imgs.push(img);
      }
      spriteFramesRef.current[key] = imgs;
    }

    LEVELS.forEach((lv, i) => {
      const img = new Image();
      img.src = lv.bg;
      img.onload = () => { bgImagesRef.current[i] = img; };
    });

    const floorLeft = new Image();
    floorLeft.src = "/images/floor/border-left.png";
    floorLeft.onload = () => { floorRef.current.left = floorLeft; };

    const floorMid = new Image();
    floorMid.src = "/images/floor/middle-base.png";
    floorMid.onload = () => { floorRef.current.mid = floorMid; };

    const floorRight = new Image();
    floorRight.src = "/images/floor/border-right.png";
    floorRight.onload = () => { floorRef.current.right = floorRight; };

    const meliBadge = new Image();
    meliBadge.crossOrigin = "anonymous";
    meliBadge.onload = () => { meliBadgeRef.current = meliBadge; };
    meliBadge.src = "/images/meli-badge.png";

    enemiesRef.current = spawnEnemies(0, CANVAS_W);
  }, []);

  // Cleanup transition timers on unmount (#1)
  useEffect(() => () => {
    if (outerTimerRef.current) clearTimeout(outerTimerRef.current);
    if (innerTimerRef.current) clearTimeout(innerTimerRef.current);
  }, []);

  // Shared transition helper extracted to eliminate duplication (#3)
  const triggerLevelTransition = useCallback((idx: number, playerX: number) => {
    transitionRef.current = true;
    setTransitioning(true);
    outerTimerRef.current = setTimeout(() => {
      levelRef.current = idx;
      setCurrentLevel(idx);
      const p = playerRef.current;
      p.x = playerX;
      p.y = 0;
      p.vy = 0;
      p.grounded = false;
      p.invincible = 0;
      enemiesRef.current = spawnEnemies(idx, CANVAS_W);
      innerTimerRef.current = setTimeout(() => {
        transitionRef.current = false;
        setTransitioning(false);
      }, 200);
    }, 200);
  }, []);

  const changeLevel = useCallback(
    (dir: 1 | -1) => {
      if (transitionRef.current) return;
      if (levelRef.current === LEVELS.length - 1) return;
      const next = levelRef.current + dir;
      if (next < 0 || next >= LEVELS.length) return;
      const playerX = dir === 1 ? 40 : CANVAS_W - CHAR_W - 40;
      triggerLevelTransition(next, playerX);
    },
    [triggerLevelTransition]
  );

  // Keyboard / touch listeners
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key);
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => { keysRef.current.delete(e.key); };
    const resetTouch = () => {
      touchRef.current.left = false;
      touchRef.current.right = false;
      touchRef.current.jump = false;
      touchRef.current.down = false;
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("mouseup", resetTouch);
    window.addEventListener("touchend", resetTouch);
    window.addEventListener("touchcancel", resetTouch);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("mouseup", resetTouch);
      window.removeEventListener("touchend", resetTouch);
      window.removeEventListener("touchcancel", resetTouch);
    };
  }, []);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    const W = CANVAS_W;
    const H = CANVAS_H;

    // --- Physics / input helpers (stay here — use multiple refs/state setters) ---

    function applyInput(p: PlayerState, groundY: number, inTransition: boolean) {
      const keys = keysRef.current;
      const touch = touchRef.current;
      if (!inTransition) {
        const left = keys.has("ArrowLeft") || keys.has("a") || keys.has("A") || touch.left;
        const right = keys.has("ArrowRight") || keys.has("d") || keys.has("D") || touch.right;
        const jumpPress = keys.has("ArrowUp") || keys.has("w") || keys.has("W") || keys.has(" ") || touch.jump;
        const downPress = keys.has("ArrowDown") || keys.has("s") || keys.has("S") || touch.down;
        p.vx = 0;
        if (left) { p.vx = -RUN_SPEED; p.facingLeft = true; }
        if (right) { p.vx = RUN_SPEED; p.facingLeft = false; }
        if (jumpPress && p.grounded) { p.vy = JUMP_VEL; p.grounded = false; }
        if (downPress && p.grounded && p.y + CHAR_H < groundY - 2) {
          p.y += 6;
          p.grounded = false;
          p.vy = 1;
        }
      } else {
        p.vx = 0;
      }
    }

    function applyPhysics(p: PlayerState, lvl: (typeof LEVELS)[number], groundY: number, scale: number) {
      p.vy += GRAVITY * scale;
      p.x += p.vx * scale;
      p.y += p.vy * scale;
      const keys = keysRef.current;
      const isDropping = keys.has("ArrowDown") || keys.has("s") || keys.has("S") || touchRef.current.down;
      p.grounded = false;
      if (p.y + CHAR_H >= groundY) {
        p.y = groundY - CHAR_H;
        p.vy = 0;
        p.grounded = true;
      }
      const feetY = p.y + CHAR_H;
      const prevFeetY = feetY - p.vy;
      const playerCX = p.x + CHAR_W / 2;
      if (!isDropping) {
        for (const plat of lvl.platforms) {
          const px = plat.xPct * W;
          const pw = plat.wPct * W;
          const platTop = groundY - plat.hAbove;
          if (playerCX >= px && playerCX <= px + pw && p.vy >= 0 && prevFeetY <= platTop + 4 && feetY >= platTop) {
            p.y = platTop - CHAR_H;
            p.vy = 0;
            p.grounded = true;
            break;
          }
        }
      }
    }

    function updateAnimation(p: PlayerState, dt: number) {
      let newAnim: AnimState;
      if (!p.grounded) newAnim = "jump";
      else if (p.vx !== 0) newAnim = "run";
      else newAnim = "idle";
      if (newAnim !== p.anim) { p.anim = newAnim; p.frame = 0; p.frameTimer = 0; }
      p.frameTimer += dt;
      const spd = ANIM_SPEED[p.anim];
      if (p.frameTimer >= spd) { p.frameTimer -= spd; p.frame = (p.frame + 1) % ANIM_FRAMES[p.anim]; }
    }

    function updateAndRenderEnemies(p: PlayerState, lvl: (typeof LEVELS)[number], groundY: number, time: number, dt: number, scale: number) {
      for (const enemy of enemiesRef.current) {
        if (enemy.alive) {
          enemy.x += enemy.vx * scale;
          if (enemy.x <= enemy.patrolMin || enemy.x >= enemy.patrolMax - ENEMY_SIZE) {
            enemy.vx *= -1;
            enemy.x = Math.max(enemy.patrolMin, Math.min(enemy.x, enemy.patrolMax - ENEMY_SIZE));
          }
          let ey: number;
          if (enemy.platformIdx >= 0) {
            const plat = lvl.platforms[enemy.platformIdx];
            ey = plat ? groundY - plat.hAbove - ENEMY_SIZE : groundY - ENEMY_SIZE;
          } else {
            ey = groundY - ENEMY_SIZE;
          }
          const ex = enemy.x;
          const eCX = ex + ENEMY_SIZE / 2;
          const eCY = ey + ENEMY_SIZE / 2;
          const pFeetY = p.y + CHAR_H;
          const pPrevFeetY = pFeetY - p.vy;
          const pCX = p.x + CHAR_W / 2;
          const margin = ENEMY_SIZE * 0.25;
          const stompOverlapX = p.x + CHAR_W > ex - 4 && p.x < ex + ENEMY_SIZE + 4;
          const stompHit = stompOverlapX && p.vy > 0 && pPrevFeetY <= ey + 14 && pFeetY >= ey - 4;
          if (stompHit) {
            enemy.alive = false;
            enemy.deathTimer = 0;
            p.vy = JUMP_VEL * STOMP_BOUNCE_FACTOR;
            p.grounded = false;
          } else if (p.invincible <= 0) {
            const pRight = p.x + CHAR_W;
            const hitX = pRight > ex + margin && p.x < ex + ENEMY_SIZE - margin;
            const hitY = pFeetY > ey + margin && p.y < ey + ENEMY_SIZE - margin;
            if (hitX && hitY) {
              p.hp = Math.max(0, p.hp - 1);
              p.invincible = INVINCIBLE_MS;
              p.vx = pCX < eCX ? -KNOCKBACK_VX : KNOCKBACK_VX;
              p.x += p.vx * 2;
              if (p.hp <= 0 && !gameOverRef.current) {
                gameOverRef.current = true;
                setGameOver(true);
              }
            }
          }
          drawEnemy(ctx, enemy.type, eCX, eCY, ENEMY_SIZE / 2, time, true, 0);
        } else {
          enemy.deathTimer += dt;
          if (enemy.deathTimer < ENEMY_DEATH_DURATION) {
            let dey: number;
            if (enemy.platformIdx >= 0) {
              const plat = lvl.platforms[enemy.platformIdx];
              dey = plat ? groundY - plat.hAbove - ENEMY_SIZE / 2 : groundY - ENEMY_SIZE / 2;
            } else {
              dey = groundY - ENEMY_SIZE / 2;
            }
            const eCX = enemy.x + ENEMY_SIZE / 2;
            drawEnemy(ctx, enemy.type, eCX, dey, ENEMY_SIZE / 2, time, false, enemy.deathTimer);
          }
        }
      }
    }

    function updateAndRenderBadge(p: PlayerState, lvl: (typeof LEVELS)[number], groundY: number, time: number) {
      const lvlIdx = levelRef.current;
      if (collectedRef.current.has(lvlIdx)) return;
      const badgePlatIdx = lvl.badgePlatformIdx; // (#10) no longer a separate array
      if (badgePlatIdx === undefined) return;
      const bPlat = lvl.platforms[badgePlatIdx];
      if (!bPlat) return;
      const bx = (bPlat.xPct + bPlat.wPct / 2) * W;
      const by = groundY - bPlat.hAbove - BADGE_R * 1.8 + Math.sin(time * 0.003) * 4;
      const glow = ctx.createRadialGradient(bx, by, 0, bx, by, BADGE_R * 2.5);
      glow.addColorStop(0, "rgba(0, 240, 255, 0.25)");
      glow.addColorStop(1, "rgba(0, 240, 255, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(bx, by, BADGE_R * 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(bx, by, BADGE_R, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(10, 10, 15, 0.85)";
      ctx.fill();
      ctx.strokeStyle = "#00f0ff";
      ctx.lineWidth = 2;
      ctx.stroke();
      if (lvlIdx === 5 && meliBadgeRef.current) {
        const mi = meliBadgeRef.current;
        const iw = BADGE_R * 1.8;
        const ih = iw * (mi.naturalHeight / mi.naturalWidth) || iw * 0.76;
        ctx.drawImage(mi, bx - iw / 2, by - ih / 2, iw, ih);
      } else {
        drawBadgeIcon(ctx, lvlIdx, bx, by, BADGE_R * 0.6);
      }
      const pcx = p.x + CHAR_W / 2;
      const pcy = p.y + CHAR_H / 2;
      const dist = Math.sqrt((pcx - bx) ** 2 + (pcy - by) ** 2);
      if (dist < CHAR_W / 2 + BADGE_R) {
        collectedRef.current.add(lvlIdx);
        const newSet = new Set(collectedRef.current);
        setCollectedBadges(newSet);
        try { localStorage.setItem("journey-badges", JSON.stringify([...newSet])); } catch {}
        collectFxRef.current = { x: bx, y: by, elapsed: 0 };
        p.hp = Math.min(p.maxHp, p.hp + BADGE_HEAL_HP);
      }
    }

    // --- Game loop ---

    const gameLoop = (time: number) => {
      const dt = lastTimeRef.current ? Math.min(time - lastTimeRef.current, MAX_FRAME_DT) : TARGET_FRAME_MS;
      lastTimeRef.current = time;
      const scale = dt / TARGET_FRAME_MS;

      const lvl = LEVELS[levelRef.current];
      const groundY = H - H * lvl.groundPct;
      const p = playerRef.current;
      const curLvl = levelRef.current;
      const FINALE_LEVEL = LEVELS.length - 1;

      // Exclusive screens (start / game-over) rendered via exported helpers (#6)
      if (!gameStartedRef.current) {
        renderStartScreen(ctx, bgImagesRef.current[0], finaleTextsRef.current, W, H, time);
        rafRef.current = requestAnimationFrame(gameLoop);
        return;
      }
      if (gameOverRef.current) {
        renderGameOverScreen(ctx, bgImagesRef.current[levelRef.current], finaleTextsRef.current, levelRef.current, LEVELS.length, W, H, time);
        rafRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      applyInput(p, groundY, transitionRef.current);
      applyPhysics(p, lvl, groundY, scale);

      const isLastBadgeLevel = curLvl === FINALE_LEVEL - 1;
      const hasLastBadge = collectedRef.current.has(FINALE_LEVEL - 1);
      if (p.x < -CHAR_W * 0.6 && !transitionRef.current) {
        if (curLvl > 0) changeLevel(-1);
      } else if (p.x > W - CHAR_W * 0.4 && !transitionRef.current) {
        if (isLastBadgeLevel && !hasLastBadge) {
          p.x = W - CHAR_W * 0.4;
        } else if (curLvl === FINALE_LEVEL) {
          p.x = W - CHAR_W * 0.4;
        } else {
          changeLevel(1);
        }
      }
      p.x = Math.max(-CHAR_W * 0.6, Math.min(p.x, W - CHAR_W * 0.4));

      if (curLvl === FINALE_LEVEL && !gameCompleteRef.current) {
        gameCompleteRef.current = true;
      }

      updateAnimation(p, dt);

      ctx.clearRect(0, 0, W, H);
      drawBackground(ctx, bgImagesRef.current[curLvl], W, H);

      if (curLvl !== FINALE_LEVEL) {
        drawAllPlatforms(ctx, floorRef.current, lvl, groundY, W);
        if (p.invincible > 0) p.invincible = Math.max(0, p.invincible - dt);
        updateAndRenderEnemies(p, lvl, groundY, time, dt, scale);
        updateAndRenderBadge(p, lvl, groundY, time);
        drawCollectFx(ctx, collectFxRef.current, dt);
        drawPlayer(ctx, spriteFramesRef.current, p);
        drawNextLevelArrow(ctx, curLvl, collectedRef.current.has(FINALE_LEVEL - 1), groundY, time, W);
      } else {
        renderFinaleScreen(ctx, finaleTextsRef.current, collectedRef.current.size, W, H, time);
      }

      rafRef.current = requestAnimationFrame(gameLoop);
    };

    rafRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [changeLevel]);

  const goToLevel = useCallback(
    (idx: number) => {
      if (transitionRef.current || idx === levelRef.current) return;
      if (levelRef.current === FINALE_IDX) return;
      triggerLevelTransition(idx, 100);
    },
    [triggerLevelTransition]
  );

  const resetGame = useCallback((resetBadges: boolean) => {
    gameOverRef.current = false;
    setGameOver(false);
    if (resetBadges) {
      collectedRef.current = new Set();
      setCollectedBadges(new Set());
      gameCompleteRef.current = false;
      try { localStorage.removeItem("journey-badges"); } catch {}
    }
    levelRef.current = 0;
    setCurrentLevel(0);
    const p = playerRef.current;
    p.x = 100;
    p.y = 0;
    p.vx = 0;
    p.vy = 0;
    p.grounded = false;
    p.hp = PLAYER_MAX_HP;
    p.maxHp = PLAYER_MAX_HP;
    p.invincible = 0;
    transitionRef.current = false;
    setTransitioning(false);
    enemiesRef.current = spawnEnemies(0, CANVAS_W);
  }, []);

  // Sync translations into the ref used by canvas render helpers
  useEffect(() => {
    const j = t.journey;
    finaleTextsRef.current = {
      complete: j.complete,
      badges: j.badges,
      forNow: j.forNow,
      gameOver: j.gameOver,
      playAgain: j.playAgain,
      tryAgain: j.tryAgain,
      reset: j.reset,
      terminalTitle: j.terminalTitle,
      startTitle: j.startTitle,
      startSubtitle: j.startSubtitle,
      startButton: j.startButton,
      startHint: j.startHint,
      enemies: j.enemies as Record<string, string>,
      badgeLabels: j.badgeLabels,
    };
  }, [t]);

  const startGame = useCallback(() => {
    gameStartedRef.current = true;
    setGameStarted(true);
  }, []);

  return {
    canvasRef,
    touchRef,
    currentLevel,
    transitioning,
    gameStarted,
    collectedBadges,
    gameOver,
    startGame,
    goToLevel,
    resetGame,
  };
}
