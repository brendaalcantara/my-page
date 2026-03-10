import type { Platform, AnimState, EnemyType, EnemyDef, LiveEnemy } from "./gameTypes";

// Character sprite animation data (defined here to avoid importing from a React component)
export const ANIMATIONS: Record<AnimState, string[]> = {
  idle: [
    "/images/character/idle-normal.png",
    "/images/character/idle-glasses.png",
    "/images/character/idle-hands-on-hips.png",
  ],
  run: [
    "/images/character/ready-to-run-right.png",
    "/images/character/start-run-right.png",
    "/images/character/running-fast-right.png",
  ],
  jump: [
    "/images/character/preparing-to-jump.png",
    "/images/character/after-jump.png",
    "/images/character/jump-peak.png",
    "/images/character/descending-jump.png",
    "/images/character/landing.png",
  ],
};

export const IDLE_SEQUENCE = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  2, 2, 2,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 1,
  0, 0, 0, 0, 0, 0, 0, 0,
];

// Canvas internal resolution (CSS handles responsive scaling)
export const CANVAS_W = 960;
export const CANVAS_H = 540;

// Character dimensions
export const SPRITE_ASPECT = 422 / 640;
export const CHAR_H = 130;
export const CHAR_W = CHAR_H * SPRITE_ASPECT;

// Physics
export const GRAVITY = 0.45;
export const RUN_SPEED = 5;
export const JUMP_VEL = -10;

// Animation timing
export const ANIM_FRAMES: Record<AnimState, number> = {
  idle: IDLE_SEQUENCE.length,
  run: 3,
  jump: 5,
};
export const ANIM_SPEED: Record<AnimState, number> = {
  idle: 500,
  run: 90,
  jump: 180,
};

// Player
export const PLAYER_MAX_HP = 10;
export const INVINCIBLE_MS = 1200;

// Badges
export const BADGE_R = 18;
export const BADGE_LABELS = [
  "Determinada & Resiliente",
  "Colaboração & Equipe",
  "Excelente Comunicação",
  "Mentalidade Proativa",
  "Java",
  "Ecossistema Meli",
  "Observabilidade",
  "Español",
  "Novas Tecnologias",
];
// Enemies
export const ENEMY_SIZE = 44;
export const ENEMY_SPEED = 1.8;
export const ENEMY_DEATH_DURATION = 400; // ms until dead enemy fully fades

// Combat
export const KNOCKBACK_VX = 8;           // px/frame horizontal knockback on hit
export const STOMP_BOUNCE_FACTOR = 0.55; // fraction of JUMP_VEL applied on stomp
export const BADGE_HEAL_HP = 2;          // HP restored when collecting a badge

// Rendering
export const BLINK_INTERVAL_MS = 80;    // invincibility blink period in ms
export const HP_BAR_H = 6;              // HP bar height in px
export const HP_BAR_OFFSET_Y = 12;      // distance above player top for HP bar
export const FLOOR_TILE_H = 50;         // ground floor tile height in px
export const PLAT_TILE_H = 35;          // raised platform tile height in px
export const COLLECT_FX_DURATION = 600; // badge collect ripple animation duration ms
export const MAX_FRAME_DT = 32;         // max delta-time cap per frame in ms
export const TARGET_FRAME_MS = 1000 / 60; // physics designed for 60fps — used to normalise dt

export const LEVELS: { bg: string; groundPct: number; platforms: Platform[]; badgePlatformIdx?: number }[] = [
  { bg: "/images/city-1.png", groundPct: 0.04, badgePlatformIdx: 1, platforms: [
    { xPct: 0.15, wPct: 0.20, hAbove: 90 },
    { xPct: 0.55, wPct: 0.25, hAbove: 110 },
  ]},
  { bg: "/images/ifba.png", groundPct: 0.04, badgePlatformIdx: 2, platforms: [
    { xPct: 0.10, wPct: 0.22, hAbove: 70 },
    { xPct: 0.40, wPct: 0.18, hAbove: 110 },
    { xPct: 0.70, wPct: 0.22, hAbove: 120 },
  ]},
  { bg: "/images/ufsb.png", groundPct: 0.04, badgePlatformIdx: 1, platforms: [
    { xPct: 0.05, wPct: 0.18, hAbove: 80 },
    { xPct: 0.75, wPct: 0.18, hAbove: 95 },
  ]},
  { bg: "/images/pathogens-game.png", groundPct: 0.005, badgePlatformIdx: 1, platforms: [
    { xPct: 0.08, wPct: 0.20, hAbove: 60 },
    { xPct: 0.72, wPct: 0.20, hAbove: 110 },
  ]},
  { bg: "/images/bootcamp.png", groundPct: 0.03, badgePlatformIdx: 1, platforms: [
    { xPct: 0.20, wPct: 0.25, hAbove: 80 },
    { xPct: 0.60, wPct: 0.25, hAbove: 110 },
  ]},
  { bg: "/images/mercado-libre.png", groundPct: 0.02, badgePlatformIdx: 3, platforms: [
    { xPct: 0.10, wPct: 0.18, hAbove: 70 },
    { xPct: 0.35, wPct: 0.15, hAbove: 110 },
    { xPct: 0.55, wPct: 0.15, hAbove: 70 },
    { xPct: 0.78, wPct: 0.18, hAbove: 125 },
  ]},
  { bg: "/images/backend-engineer-supermarket-team.png", groundPct: 0.04, badgePlatformIdx: 2, platforms: [
    { xPct: 0.12, wPct: 0.22, hAbove: 90 },
    { xPct: 0.50, wPct: 0.22, hAbove: 60 },
    { xPct: 0.80, wPct: 0.15, hAbove: 125 },
  ]},
  { bg: "/images/backend-engineer-supermarket-team.png", groundPct: 0.04, badgePlatformIdx: 3, platforms: [
    { xPct: 0.05, wPct: 0.20, hAbove: 60 },
    { xPct: 0.30, wPct: 0.15, hAbove: 100 },
    { xPct: 0.52, wPct: 0.20, hAbove: 60 },
    { xPct: 0.80, wPct: 0.15, hAbove: 120 },
  ]},
  { bg: "/images/personal-projects.png", groundPct: 0.04, badgePlatformIdx: 2, platforms: [
    { xPct: 0.10, wPct: 0.20, hAbove: 80 },
    { xPct: 0.40, wPct: 0.20, hAbove: 110 },
    { xPct: 0.70, wPct: 0.20, hAbove: 120 },
  ]},
  { bg: "/images/next-chapter.png", groundPct: 0.04, platforms: [] },
];

const LEVEL_ENEMY_TYPES: EnemyType[] = [
  "daydream", "doubt", "saudade", "virus", "money", "adapt", "bug", "alert", "clock",
];

function buildLevelEnemies(): Record<number, EnemyDef[]> {
  const base: Record<number, EnemyDef[]> = {
    0: [
      { type: "daydream", xPct: 0.15, patrolMinPct: 0.03, patrolMaxPct: 0.45, speed: ENEMY_SPEED * 0.7 },
      { type: "daydream", xPct: 0.60, patrolMinPct: 0.45, patrolMaxPct: 0.88, speed: ENEMY_SPEED * 0.8 },
    ],
    1: [
      { type: "doubt", xPct: 0.15, patrolMinPct: 0.03, patrolMaxPct: 0.45, speed: ENEMY_SPEED * 0.9 },
      { type: "doubt", xPct: 0.60, patrolMinPct: 0.45, patrolMaxPct: 0.85, speed: ENEMY_SPEED },
    ],
    2: [
      { type: "saudade", xPct: 0.10, patrolMinPct: 0.03, patrolMaxPct: 0.40, speed: ENEMY_SPEED * 0.8 },
      { type: "saudade", xPct: 0.55, patrolMinPct: 0.40, patrolMaxPct: 0.85, speed: ENEMY_SPEED * 0.9 },
    ],
    3: [
      { type: "virus", xPct: 0.10, patrolMinPct: 0.03, patrolMaxPct: 0.45, speed: ENEMY_SPEED },
      { type: "virus", xPct: 0.55, patrolMinPct: 0.42, patrolMaxPct: 0.88, speed: ENEMY_SPEED * 1.2 },
    ],
    4: [
      { type: "money", xPct: 0.12, patrolMinPct: 0.03, patrolMaxPct: 0.42, speed: ENEMY_SPEED * 0.9 },
      { type: "money", xPct: 0.55, patrolMinPct: 0.42, patrolMaxPct: 0.80, speed: ENEMY_SPEED * 1.1 },
    ],
    5: [
      { type: "adapt", xPct: 0.10, patrolMinPct: 0.03, patrolMaxPct: 0.40, speed: ENEMY_SPEED * 1.1 },
      { type: "adapt", xPct: 0.50, patrolMinPct: 0.38, patrolMaxPct: 0.75, speed: ENEMY_SPEED },
    ],
    6: [
      { type: "bug", xPct: 0.08, patrolMinPct: 0.03, patrolMaxPct: 0.45, speed: ENEMY_SPEED * 1.2 },
      { type: "bug", xPct: 0.55, patrolMinPct: 0.42, patrolMaxPct: 0.85, speed: ENEMY_SPEED },
    ],
    7: [
      { type: "alert", xPct: 0.12, patrolMinPct: 0.03, patrolMaxPct: 0.38, speed: ENEMY_SPEED * 1.3 },
      { type: "alert", xPct: 0.55, patrolMinPct: 0.40, patrolMaxPct: 0.80, speed: ENEMY_SPEED * 1.1 },
    ],
    8: [
      { type: "clock", xPct: 0.08, patrolMinPct: 0.03, patrolMaxPct: 0.42, speed: ENEMY_SPEED * 1.3 },
      { type: "clock", xPct: 0.55, patrolMinPct: 0.42, patrolMaxPct: 0.88, speed: ENEMY_SPEED * 1.5 },
    ],
  };
  for (let i = 0; i < 9; i++) {
    const pIdx = LEVELS[i].badgePlatformIdx;
    if (pIdx === undefined) continue;
    const plat = LEVELS[i].platforms[pIdx];
    if (!plat) continue;
    const eType = LEVEL_ENEMY_TYPES[i];
    if (!base[i]) base[i] = [];
    base[i].push({
      type: eType,
      xPct: plat.xPct + plat.wPct * 0.2,
      patrolMinPct: plat.xPct,
      patrolMaxPct: plat.xPct + plat.wPct,
      speed: ENEMY_SPEED * 0.8,
      platformIdx: pIdx,
    });
  }
  return base;
}

export const LEVEL_ENEMIES = buildLevelEnemies();

export function spawnEnemies(levelIdx: number, canvasW: number): LiveEnemy[] {
  const defs = LEVEL_ENEMIES[levelIdx];
  if (!defs) return [];
  return defs.map(d => ({
    x: d.xPct * canvasW,
    vx: d.speed,
    alive: true,
    type: d.type,
    deathTimer: 0,
    patrolMin: d.patrolMinPct * canvasW,
    patrolMax: d.patrolMaxPct * canvasW,
    platformIdx: d.platformIdx ?? -1,
  }));
}
