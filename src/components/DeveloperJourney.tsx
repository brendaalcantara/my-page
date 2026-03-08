"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { ANIMATIONS, type CharAnimation } from "./GameCharacter";

interface Platform {
  xPct: number;
  wPct: number;
  hAbove: number;
}

const LEVELS: { bg: string; groundPct: number; platforms: Platform[] }[] = [
  { bg: "/images/city-1.png", groundPct: 0.04, platforms: [
    { xPct: 0.15, wPct: 0.20, hAbove: 90 },
    { xPct: 0.55, wPct: 0.25, hAbove: 110 },
  ]},
  { bg: "/images/ifba.png", groundPct: 0.04, platforms: [
    { xPct: 0.10, wPct: 0.22, hAbove: 70 },
    { xPct: 0.40, wPct: 0.18, hAbove: 110 },
    { xPct: 0.70, wPct: 0.22, hAbove: 120 },
  ]},
  { bg: "/images/ufsb.png", groundPct: 0.04, platforms: [
    { xPct: 0.05, wPct: 0.18, hAbove: 80 },
    { xPct: 0.75, wPct: 0.18, hAbove: 95 },
  ]},
  { bg: "/images/jogo-patogenos-bioecologicos.png", groundPct: 0.005, platforms: [
    { xPct: 0.08, wPct: 0.20, hAbove: 60 },
    { xPct: 0.72, wPct: 0.20, hAbove: 110 },
  ]},
  { bg: "/images/bootcamp.png", groundPct: 0.03, platforms: [
    { xPct: 0.20, wPct: 0.25, hAbove: 80 },
    { xPct: 0.60, wPct: 0.25, hAbove: 110 },
  ]},
  { bg: "/images/mercado-livre.png", groundPct: 0.02, platforms: [
    { xPct: 0.10, wPct: 0.18, hAbove: 70 },
    { xPct: 0.35, wPct: 0.15, hAbove: 110 },
    { xPct: 0.55, wPct: 0.15, hAbove: 70 },
    { xPct: 0.78, wPct: 0.18, hAbove: 125 },
  ]},
  { bg: "/images/backend-engineer-supermarket-team.png", groundPct: 0.04, platforms: [
    { xPct: 0.12, wPct: 0.22, hAbove: 90 },
    { xPct: 0.50, wPct: 0.22, hAbove: 60 },
    { xPct: 0.80, wPct: 0.15, hAbove: 125 },
  ]},
  { bg: "/images/backend-engineer-supermarket-team.png", groundPct: 0.04, platforms: [
    { xPct: 0.05, wPct: 0.20, hAbove: 60 },
    { xPct: 0.30, wPct: 0.15, hAbove: 100 },
    { xPct: 0.52, wPct: 0.20, hAbove: 60 },
    { xPct: 0.80, wPct: 0.15, hAbove: 120 },
  ]},
  { bg: "/images/projetos-pessoais.png", groundPct: 0.04, platforms: [
    { xPct: 0.10, wPct: 0.20, hAbove: 80 },
    { xPct: 0.40, wPct: 0.20, hAbove: 110 },
    { xPct: 0.70, wPct: 0.20, hAbove: 120 },
  ]},
  { bg: "/images/proximo-capitulo.png", groundPct: 0.04, platforms: [] },
];

const SPRITE_ASPECT = 422 / 640;
const CHAR_H = 130;
const CHAR_W = CHAR_H * SPRITE_ASPECT;

const GRAVITY = 0.45;
const RUN_SPEED = 5;
const JUMP_VEL = -10;

type AnimState = "idle" | "run" | "jump";

// idle: 0=parada-normal, 1=com-no-oculos, 2=maos-na-cintura
const IDLE_SEQUENCE = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  2, 2, 2,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 1,
  0, 0, 0, 0, 0, 0, 0, 0,
];

const ANIM_FRAMES: Record<AnimState, number> = { idle: IDLE_SEQUENCE.length, run: 3, jump: 5 };
const ANIM_SPEED: Record<AnimState, number> = { idle: 500, run: 90, jump: 180 };

interface PlayerState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  grounded: boolean;
  facingLeft: boolean;
  anim: AnimState;
  frame: number;
  frameTimer: number;
  hp: number;
  maxHp: number;
  invincible: number;
}

const PLAYER_MAX_HP = 10;
const INVINCIBLE_MS = 1200;

import { levelIconComponents } from "./Icons";

const BADGE_R = 18;
const BADGE_LABELS = [
  "Determinada & Resiliente",
  "Colaboração & Equipe",
  "Excelente Comunicação",
  "Mentalidade Proativa",
  "Java",
  "Kotlin",
  "Observabilidade",
  "Español",
  "Novas Tecnologias",
];
const BADGE_PLATFORM_IDX = [1, 2, 1, 1, 1, 3, 2, 3, 2];

function drawBadgeIcon(ctx: CanvasRenderingContext2D, level: number, cx: number, cy: number, r: number) {
  ctx.save();
  ctx.lineWidth = 1.5;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  switch (level) {
    case 0: {
      ctx.beginPath();
      ctx.moveTo(cx - r, cy + r * 0.7);
      ctx.lineTo(cx - r * 0.15, cy - r * 0.8);
      ctx.lineTo(cx + r * 0.15, cy - r * 0.2);
      ctx.lineTo(cx + r * 0.5, cy - r * 0.5);
      ctx.lineTo(cx + r, cy + r * 0.7);
      ctx.closePath();
      ctx.fillStyle = "#a78bfa";
      ctx.fill();
      ctx.strokeStyle = "#c4b5fd";
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - r * 0.15, cy - r * 0.8);
      ctx.lineTo(cx - r * 0.15, cy - r * 1.1);
      ctx.lineTo(cx + r * 0.2, cy - r * 0.95);
      ctx.lineTo(cx - r * 0.15, cy - r * 0.8);
      ctx.fillStyle = "#00f0ff";
      ctx.fill();
      break;
    }
    case 1: {
      const nodes = [
        { x: cx, y: cy - r * 0.65 },
        { x: cx - r * 0.6, y: cy + r * 0.45 },
        { x: cx + r * 0.6, y: cy + r * 0.45 },
      ];
      ctx.strokeStyle = "#00f0ff";
      ctx.lineWidth = 1.2;
      for (let i = 0; i < 3; i++) {
        for (let j = i + 1; j < 3; j++) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 0.18, 0, Math.PI * 2);
        ctx.fillStyle = "#a78bfa";
        ctx.fill();
        ctx.strokeStyle = "#c4b5fd";
        ctx.stroke();
      }
      break;
    }
    case 2: {
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(cx - r * 0.2, cy, r * 0.25 * i, -Math.PI * 0.4, Math.PI * 0.4);
        ctx.strokeStyle = `rgba(0, 240, 255, ${1.1 - i * 0.3})`;
        ctx.lineWidth = 1.8 - i * 0.3;
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(cx - r * 0.2, cy, r * 0.12, 0, Math.PI * 2);
      ctx.fillStyle = "#a78bfa";
      ctx.fill();
      break;
    }
    case 3: {
      ctx.beginPath();
      ctx.moveTo(cx + r * 0.15, cy - r * 0.9);
      ctx.lineTo(cx - r * 0.25, cy - r * 0.05);
      ctx.lineTo(cx + r * 0.15, cy - r * 0.05);
      ctx.lineTo(cx - r * 0.15, cy + r * 0.9);
      ctx.lineTo(cx + r * 0.25, cy + r * 0.05);
      ctx.lineTo(cx - r * 0.15, cy + r * 0.05);
      ctx.closePath();
      ctx.fillStyle = "#fbbf24";
      ctx.fill();
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 1;
      ctx.stroke();
      break;
    }
    case 4: {
      ctx.beginPath();
      ctx.moveTo(cx - r * 0.45, cy - r * 0.3);
      ctx.lineTo(cx - r * 0.3, cy + r * 0.6);
      ctx.lineTo(cx + r * 0.3, cy + r * 0.6);
      ctx.lineTo(cx + r * 0.45, cy - r * 0.3);
      ctx.closePath();
      ctx.fillStyle = "#7c3aed";
      ctx.fill();
      ctx.strokeStyle = "#a78bfa";
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx + r * 0.55, cy + r * 0.05, r * 0.2, -Math.PI * 0.5, Math.PI * 0.5);
      ctx.strokeStyle = "#a78bfa";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      for (let i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.moveTo(cx + i * r * 0.2, cy - r * 0.4);
        ctx.quadraticCurveTo(cx + i * r * 0.2 + r * 0.08, cy - r * 0.55, cx + i * r * 0.2, cy - r * 0.7);
        ctx.strokeStyle = "rgba(200,200,200,0.5)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      break;
    }
    case 5: {
      ctx.beginPath();
      ctx.moveTo(cx - r * 0.5, cy + r * 0.7);
      ctx.lineTo(cx - r * 0.5, cy - r * 0.7);
      ctx.lineTo(cx + r * 0.5, cy - r * 0.7);
      ctx.lineTo(cx, cy);
      ctx.lineTo(cx + r * 0.5, cy + r * 0.7);
      ctx.closePath();
      const kGrad = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
      kGrad.addColorStop(0, "#7F52FF");
      kGrad.addColorStop(0.5, "#C711E1");
      kGrad.addColorStop(1, "#E44857");
      ctx.fillStyle = kGrad;
      ctx.fill();
      break;
    }
    case 6: {
      ctx.beginPath();
      ctx.moveTo(cx - r * 0.9, cy);
      ctx.quadraticCurveTo(cx, cy - r * 0.8, cx + r * 0.9, cy);
      ctx.quadraticCurveTo(cx, cy + r * 0.8, cx - r * 0.9, cy);
      ctx.closePath();
      ctx.fillStyle = "rgba(0, 240, 255, 0.12)";
      ctx.fill();
      ctx.strokeStyle = "#00f0ff";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.28, 0, Math.PI * 2);
      ctx.fillStyle = "#00f0ff";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.1, 0, Math.PI * 2);
      ctx.fillStyle = "#0a0a0f";
      ctx.fill();
      break;
    }
    case 7: {
      ctx.font = `bold ${r * 1.5}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#fbbf24";
      ctx.fillText("Ñ", cx, cy + 1);
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 0.5;
      ctx.strokeText("Ñ", cx, cy + 1);
      break;
    }
    case 8: {
      ctx.beginPath();
      ctx.moveTo(cx, cy + r * 0.15);
      ctx.lineTo(cx - r * 0.7, cy - r * 0.05);
      ctx.lineTo(cx - r * 0.7, cy - r * 0.55);
      ctx.lineTo(cx, cy - r * 0.35);
      ctx.closePath();
      ctx.fillStyle = "rgba(0, 240, 255, 0.25)";
      ctx.fill();
      ctx.strokeStyle = "#00f0ff";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, cy + r * 0.15);
      ctx.lineTo(cx + r * 0.7, cy - r * 0.05);
      ctx.lineTo(cx + r * 0.7, cy - r * 0.55);
      ctx.lineTo(cx, cy - r * 0.35);
      ctx.closePath();
      ctx.fillStyle = "rgba(167, 139, 250, 0.25)";
      ctx.fill();
      ctx.strokeStyle = "#a78bfa";
      ctx.stroke();
      const sx = cx + r * 0.35, sy = cy - r * 0.7;
      ctx.beginPath();
      const sr = r * 0.22;
      for (let i = 0; i < 4; i++) {
        const a = (Math.PI / 2) * i;
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + Math.cos(a) * sr, sy + Math.sin(a) * sr);
      }
      ctx.strokeStyle = "#fbbf24";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(sx, sy, sr * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = "#fbbf24";
      ctx.fill();
      break;
    }
  }

  ctx.restore();
}

const ENEMY_SIZE = 44;
const ENEMY_SPEED = 1.8;

type EnemyType = "virus" | "money" | "clock" | "doubt" | "saudade" | "daydream" | "bug" | "cart" | "alert";

interface EnemyDef {
  type: EnemyType;
  xPct: number;
  patrolMinPct: number;
  patrolMaxPct: number;
  speed: number;
  platformIdx?: number;
}

interface LiveEnemy {
  x: number;
  vx: number;
  alive: boolean;
  type: EnemyType;
  deathTimer: number;
  patrolMin: number;
  patrolMax: number;
  platformIdx: number;
}

const LEVEL_ENEMY_TYPES: EnemyType[] = [
  "daydream", "doubt", "saudade", "virus", "money", "bug", "cart", "alert", "clock",
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
      { type: "bug", xPct: 0.10, patrolMinPct: 0.03, patrolMaxPct: 0.40, speed: ENEMY_SPEED * 1.1 },
      { type: "bug", xPct: 0.50, patrolMinPct: 0.38, patrolMaxPct: 0.75, speed: ENEMY_SPEED },
    ],
    6: [
      { type: "cart", xPct: 0.08, patrolMinPct: 0.03, patrolMaxPct: 0.45, speed: ENEMY_SPEED * 1.2 },
      { type: "cart", xPct: 0.55, patrolMinPct: 0.42, patrolMaxPct: 0.85, speed: ENEMY_SPEED },
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
    const pIdx = BADGE_PLATFORM_IDX[i];
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

const LEVEL_ENEMIES = buildLevelEnemies();

function spawnEnemies(levelIdx: number, canvasW: number): LiveEnemy[] {
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

function drawEnemy(ctx: CanvasRenderingContext2D, type: EnemyType, cx: number, cy: number, r: number, time: number, alive: boolean, deathTimer: number) {
  ctx.save();

  if (!alive) {
    const prog = Math.min(deathTimer / 400, 1);
    ctx.globalAlpha = 1 - prog;
    ctx.translate(cx, cy + r);
    ctx.scale(1 + prog * 0.5, 1 - prog * 0.8);
    ctx.translate(-cx, -(cy + r));
  }

  switch (type) {
    case "virus": {
      const spikes = 8;
      ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const angle = (Math.PI * 2 * i) / (spikes * 2) + time * 0.002;
        const rad = i % 2 === 0 ? r * 1.1 : r * 0.65;
        const x = cx + Math.cos(angle) * rad;
        const y = cy + Math.sin(angle) * rad;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      const vGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      vGrad.addColorStop(0, "#4ade80");
      vGrad.addColorStop(1, "#166534");
      ctx.fillStyle = vGrad;
      ctx.fill();
      ctx.strokeStyle = "#22c55e";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(cx - r * 0.25, cy - r * 0.15, r * 0.15, 0, Math.PI * 2);
      ctx.arc(cx + r * 0.25, cy - r * 0.15, r * 0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#0a0a0f";
      ctx.beginPath();
      ctx.arc(cx - r * 0.22, cy - r * 0.12, r * 0.07, 0, Math.PI * 2);
      ctx.arc(cx + r * 0.28, cy - r * 0.12, r * 0.07, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "money": {
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.9, 0, Math.PI * 2);
      const mGrad = ctx.createRadialGradient(cx - r * 0.2, cy - r * 0.2, 0, cx, cy, r);
      mGrad.addColorStop(0, "#fde047");
      mGrad.addColorStop(1, "#a16207");
      ctx.fillStyle = mGrad;
      ctx.fill();
      ctx.strokeStyle = "#ca8a04";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.font = `bold ${r * 1.1}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#78350f";
      ctx.fillText("$", cx, cy + 1);
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.9, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(253,224,71,0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();
      break;
    }
    case "clock": {
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.85, 0, Math.PI * 2);
      ctx.fillStyle = "#1e1b4b";
      ctx.fill();
      ctx.strokeStyle = "#818cf8";
      ctx.lineWidth = 2;
      ctx.stroke();
      for (let i = 0; i < 12; i++) {
        const a = (Math.PI * 2 * i) / 12;
        const tx = cx + Math.cos(a) * r * 0.7;
        const ty = cy + Math.sin(a) * r * 0.7;
        ctx.beginPath();
        ctx.arc(tx, ty, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = "#a5b4fc";
        ctx.fill();
      }
      const minA = time * 0.003;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(minA) * r * 0.55, cy + Math.sin(minA) * r * 0.55);
      ctx.strokeStyle = "#c7d2fe";
      ctx.lineWidth = 2;
      ctx.stroke();
      const hrA = time * 0.0005;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(hrA) * r * 0.35, cy + Math.sin(hrA) * r * 0.35);
      ctx.strokeStyle = "#e0e7ff";
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.08, 0, Math.PI * 2);
      ctx.fillStyle = "#818cf8";
      ctx.fill();
      break;
    }
    case "doubt": {
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.85, 0, Math.PI * 2);
      const dGrad = ctx.createRadialGradient(cx, cy - r * 0.2, 0, cx, cy, r);
      dGrad.addColorStop(0, "#6b7280");
      dGrad.addColorStop(1, "#1f2937");
      ctx.fillStyle = dGrad;
      ctx.fill();
      ctx.strokeStyle = "#9ca3af";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.font = `bold ${r * 1.2}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#f9fafb";
      ctx.shadowColor = "#f9fafb";
      ctx.shadowBlur = 6;
      ctx.fillText("?", cx, cy + r * 0.1);
      ctx.shadowBlur = 0;
      const bob = Math.sin(time * 0.004) * 3;
      ctx.font = `${r * 0.35}px serif`;
      ctx.fillStyle = `rgba(156,163,175,${0.5 + Math.sin(time * 0.003) * 0.3})`;
      ctx.fillText("?", cx - r * 0.55, cy - r * 0.3 + bob);
      ctx.fillText("?", cx + r * 0.55, cy - r * 0.2 - bob);
      break;
    }
    case "saudade": {
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.85, 0, Math.PI * 2);
      const sGrad = ctx.createRadialGradient(cx, cy - r * 0.15, 0, cx, cy, r);
      sGrad.addColorStop(0, "#4a1942");
      sGrad.addColorStop(1, "#1a0a1a");
      ctx.fillStyle = sGrad;
      ctx.fill();
      ctx.strokeStyle = "#7c3aed";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const px = cx - r * 0.2, py = cy + r * 0.45, ps = r * 0.2;
      ctx.fillStyle = "#a78bfa";
      ctx.beginPath();
      ctx.arc(px, py - ps * 2.5, ps * 0.55, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(px - ps * 0.25, py - ps * 1.95, ps * 0.5, ps * 1.4);
      ctx.fillRect(px - ps * 0.6, py - ps * 1.5, ps * 0.35, ps * 0.12);
      ctx.fillRect(px + ps * 0.25, py - ps * 1.5, ps * 0.35, ps * 0.12);
      ctx.fillRect(px - ps * 0.2, py - ps * 0.55, ps * 0.15, ps * 0.6);
      ctx.fillRect(px + ps * 0.05, py - ps * 0.55, ps * 0.15, ps * 0.6);

      const bx = cx + r * 0.15, by = cy - r * 0.2, br = r * 0.38;
      ctx.beginPath();
      ctx.arc(bx, by, br, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(124, 58, 237, 0.2)";
      ctx.fill();
      ctx.strokeStyle = "rgba(167, 139, 250, 0.5)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(bx - br * 0.5, by + br * 0.9, br * 0.12, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(167, 139, 250, 0.35)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(bx - br * 0.7, by + br * 1.15, br * 0.07, 0, Math.PI * 2);
      ctx.fill();

      const fs = r * 0.17;
      const f1x = bx - fs * 1.1, f2x = bx, f3x = bx + fs * 1.1;
      const fy = by;
      ctx.fillStyle = "#c4b5fd";
      ctx.beginPath();
      ctx.arc(f1x, fy - fs * 0.9, fs * 0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(f1x - fs * 0.15, fy - fs * 0.55, fs * 0.3, fs * 0.8);

      ctx.beginPath();
      ctx.arc(f2x, fy - fs * 1.1, fs * 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(f2x - fs * 0.13, fy - fs * 0.8, fs * 0.26, fs * 1.0);

      ctx.beginPath();
      ctx.arc(f3x, fy - fs * 0.9, fs * 0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(f3x - fs * 0.15, fy - fs * 0.55, fs * 0.3, fs * 0.8);

      const tearSpeed = 0.025;
      const tearProg = (time * tearSpeed) % (r * 0.8);
      const tAlpha = 1 - tearProg / (r * 0.8);
      ctx.fillStyle = `rgba(196, 181, 253, ${tAlpha * 0.6})`;
      ctx.beginPath();
      ctx.arc(px + ps * 0.1, py - ps * 2.1 + tearProg, r * 0.035, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
      break;
    }
    case "daydream": {
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.85, 0, Math.PI * 2);
      const dmGrad = ctx.createRadialGradient(cx, cy - r * 0.15, 0, cx, cy, r);
      dmGrad.addColorStop(0, "#312e81");
      dmGrad.addColorStop(1, "#0f0d2e");
      ctx.fillStyle = dmGrad;
      ctx.fill();
      ctx.strokeStyle = "#6366f1";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const dpx = cx - r * 0.2, dpy = cy + r * 0.45, dps = r * 0.2;
      ctx.fillStyle = "#a5b4fc";
      ctx.beginPath();
      ctx.arc(dpx, dpy - dps * 2.5, dps * 0.55, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(dpx - dps * 0.25, dpy - dps * 1.95, dps * 0.5, dps * 1.4);
      ctx.fillRect(dpx - dps * 0.6, dpy - dps * 1.5, dps * 0.35, dps * 0.12);
      ctx.fillRect(dpx + dps * 0.25, dpy - dps * 1.5, dps * 0.35, dps * 0.12);
      ctx.fillRect(dpx - dps * 0.2, dpy - dps * 0.55, dps * 0.15, dps * 0.6);
      ctx.fillRect(dpx + dps * 0.05, dpy - dps * 0.55, dps * 0.15, dps * 0.6);

      const dbx = cx + r * 0.15, dby = cy - r * 0.2, dbr = r * 0.38;
      ctx.beginPath();
      ctx.arc(dbx, dby, dbr, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(99, 102, 241, 0.2)";
      ctx.fill();
      ctx.strokeStyle = "rgba(165, 180, 252, 0.5)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(dbx - dbr * 0.5, dby + dbr * 0.9, dbr * 0.12, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(165, 180, 252, 0.35)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(dbx - dbr * 0.7, dby + dbr * 1.15, dbr * 0.07, 0, Math.PI * 2);
      ctx.fill();

      const dmx = dbx, dmy = dby, dmr = dbr * 0.5;
      ctx.beginPath();
      ctx.arc(dmx, dmy, dmr, 0, Math.PI * 2);
      ctx.fillStyle = "#fde68a";
      ctx.shadowColor = "#fde68a";
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(dmx + dmr * 0.4, dmy - dmr * 0.25, dmr * 0.7, 0, Math.PI * 2);
      ctx.fillStyle = "#312e81";
      ctx.fill();

      const zzX = cx + r * 0.55, zzY = cy - r * 0.55;
      const zzAlpha = 0.4 + Math.sin(time * 0.003) * 0.3;
      ctx.font = `bold ${r * 0.25}px monospace`;
      ctx.textAlign = "center";
      ctx.fillStyle = `rgba(165, 180, 252, ${zzAlpha})`;
      ctx.fillText("z", zzX, zzY);
      ctx.font = `bold ${r * 0.18}px monospace`;
      ctx.fillText("z", zzX + r * 0.15, zzY - r * 0.18);

      ctx.restore();
      break;
    }
    case "bug": {
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.85, 0, Math.PI * 2);
      const bugGrad = ctx.createRadialGradient(cx, cy - r * 0.2, 0, cx, cy, r);
      bugGrad.addColorStop(0, "#166534");
      bugGrad.addColorStop(1, "#052e16");
      ctx.fillStyle = bugGrad;
      ctx.fill();
      ctx.strokeStyle = "#22c55e";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx, cy + r * 0.05, r * 0.35, r * 0.45, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#22c55e";
      ctx.fill();
      ctx.strokeStyle = "#86efac";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, cy - r * 0.4);
      ctx.lineTo(cx, cy + r * 0.5);
      ctx.strokeStyle = "#052e16";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const legA = Math.sin(time * 0.008) * 0.3;
      ctx.strokeStyle = "#4ade80";
      ctx.lineWidth = 1.5;
      for (let li = 0; li < 3; li++) {
        const ly = cy - r * 0.1 + li * r * 0.25;
        const la = legA * (li % 2 === 0 ? 1 : -1);
        ctx.beginPath();
        ctx.moveTo(cx - r * 0.35, ly);
        ctx.lineTo(cx - r * 0.65, ly - r * 0.1 + Math.sin(la) * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx + r * 0.35, ly);
        ctx.lineTo(cx + r * 0.65, ly - r * 0.1 - Math.sin(la) * 2);
        ctx.stroke();
      }

      ctx.fillStyle = "#bbf7d0";
      ctx.beginPath();
      ctx.arc(cx - r * 0.15, cy - r * 0.25, r * 0.1, 0, Math.PI * 2);
      ctx.arc(cx + r * 0.15, cy - r * 0.25, r * 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#052e16";
      ctx.beginPath();
      ctx.arc(cx - r * 0.15, cy - r * 0.23, r * 0.05, 0, Math.PI * 2);
      ctx.arc(cx + r * 0.15, cy - r * 0.23, r * 0.05, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#4ade80";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - r * 0.1, cy - r * 0.42);
      ctx.quadraticCurveTo(cx - r * 0.25, cy - r * 0.65, cx - r * 0.3, cy - r * 0.55);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + r * 0.1, cy - r * 0.42);
      ctx.quadraticCurveTo(cx + r * 0.25, cy - r * 0.65, cx + r * 0.3, cy - r * 0.55);
      ctx.stroke();
      break;
    }
    case "cart": {
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.85, 0, Math.PI * 2);
      const cartGrad = ctx.createRadialGradient(cx, cy - r * 0.2, 0, cx, cy, r);
      cartGrad.addColorStop(0, "#3f3f46");
      cartGrad.addColorStop(1, "#18181b");
      ctx.fillStyle = cartGrad;
      ctx.fill();
      ctx.strokeStyle = "#a1a1aa";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const cs = r * 0.5;
      const ccx = cx, ccy = cy - r * 0.05;
      ctx.strokeStyle = "#d4d4d8";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(ccx - cs * 0.7, ccy - cs * 0.5);
      ctx.lineTo(ccx + cs * 0.7, ccy - cs * 0.35);
      ctx.lineTo(ccx + cs * 0.55, ccy + cs * 0.5);
      ctx.lineTo(ccx - cs * 0.55, ccy + cs * 0.5);
      ctx.closePath();
      ctx.stroke();
      ctx.fillStyle = "rgba(161, 161, 170, 0.15)";
      ctx.fill();

      ctx.strokeStyle = "#d4d4d8";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(ccx - cs * 1.0, ccy - cs * 0.7);
      ctx.lineTo(ccx - cs * 0.7, ccy - cs * 0.5);
      ctx.stroke();

      const wr = r * 0.1;
      const wspin = time * 0.012;
      ctx.fillStyle = "#71717a";
      ctx.strokeStyle = "#a1a1aa";
      ctx.lineWidth = 1;
      for (const wx of [ccx - cs * 0.35, ccx + cs * 0.35]) {
        const wy = ccy + cs * 0.5 + wr * 0.6;
        ctx.beginPath();
        ctx.arc(wx, wy, wr, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = "#d4d4d8";
        for (let sp = 0; sp < 3; sp++) {
          const sa = wspin + sp * Math.PI * 2 / 3;
          ctx.beginPath();
          ctx.moveTo(wx, wy);
          ctx.lineTo(wx + Math.cos(sa) * wr * 0.7, wy + Math.sin(sa) * wr * 0.7);
          ctx.stroke();
        }
        ctx.strokeStyle = "#a1a1aa";
      }

      const bob2 = Math.sin(time * 0.005) * 1.5;
      ctx.fillStyle = "#fbbf24";
      ctx.fillRect(ccx - cs * 0.35, ccy - cs * 0.3 + bob2, cs * 0.3, cs * 0.4);
      ctx.fillStyle = "#fb923c";
      ctx.beginPath();
      ctx.arc(ccx + cs * 0.15, ccy - cs * 0.1 - bob2, cs * 0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#a3e635";
      ctx.fillRect(ccx, ccy - cs * 0.35 + bob2 * 0.5, cs * 0.2, cs * 0.25);
      break;
    }
    case "alert": {
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.85, 0, Math.PI * 2);
      const alGrad = ctx.createRadialGradient(cx, cy - r * 0.2, 0, cx, cy, r);
      alGrad.addColorStop(0, "#dc2626");
      alGrad.addColorStop(1, "#7f1d1d");
      ctx.fillStyle = alGrad;
      ctx.fill();

      const pulse = 0.6 + Math.sin(time * 0.008) * 0.4;
      ctx.strokeStyle = `rgba(239, 68, 68, ${pulse})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx, cy - r * 0.55);
      ctx.lineTo(cx - r * 0.45, cy + r * 0.35);
      ctx.lineTo(cx + r * 0.45, cy + r * 0.35);
      ctx.closePath();
      ctx.fillStyle = "#fbbf24";
      ctx.shadowColor = "#fbbf24";
      ctx.shadowBlur = 4;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.font = `bold ${r * 0.55}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#7f1d1d";
      ctx.fillText("!", cx, cy + r * 0.05);

      const ringAlpha = 0.3 + Math.sin(time * 0.006) * 0.25;
      ctx.strokeStyle = `rgba(251, 191, 36, ${ringAlpha})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.1, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.3, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(251, 191, 36, ${ringAlpha * 0.5})`;
      ctx.stroke();

      ctx.restore();
      break;
    }
  }

  ctx.restore();
}

export default function DeveloperJourney() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const gameStartedRef = useRef(false);

  const CANVAS_W = 960;
  const CANVAS_H = 540;
  const canvasSize = { w: CANVAS_W, h: CANVAS_H };

  const mouseRef = useRef<{ x: number; y: number }>({ x: -1, y: -1 });
  const tooltipRef = useRef<{ text: string; x: number; y: number } | null>(null);
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
  const rafRef = useRef(0);
  const lastTimeRef = useRef(0);
  const transitionRef = useRef(false);

  const [collectedBadges, setCollectedBadges] = useState<Set<number>>(new Set());
  const collectedRef = useRef<Set<number>>(new Set());
  const collectFxRef = useRef<{ x: number; y: number; elapsed: number } | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const gameCompleteRef = useRef(false);
  const [gameOver, setGameOver] = useState(false);
  const gameOverRef = useRef(false);
  const finaleTextsRef = useRef({
    complete: "", badges: "", forNow: "", gameOver: "",
    playAgain: "", tryAgain: "", reset: "", terminalTitle: "",
    startTitle: "", startSubtitle: "", startButton: "", startHint: "",
    enemies: {} as Record<string, string>,
  });
  const enemiesRef = useRef<LiveEnemy[]>([]);

  useEffect(() => {
    const animKeys: AnimState[] = ["idle", "run", "jump"];
    for (const key of animKeys) {
      const paths = ANIMATIONS[key as CharAnimation];
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
      img.onload = () => {
        bgImagesRef.current[i] = img;
      };
    });

    const floorLeft = new Image();
    floorLeft.src = "/images/chao/borda-esquerda.png";
    floorLeft.onload = () => { floorRef.current.left = floorLeft; };

    const floorMid = new Image();
    floorMid.src = "/images/chao/meio-da-base.png";
    floorMid.onload = () => { floorRef.current.mid = floorMid; };

    const floorRight = new Image();
    floorRight.src = "/images/chao/borda-direita.png";
    floorRight.onload = () => { floorRef.current.right = floorRight; };

    try {
      const saved = localStorage.getItem("journey-badges");
      if (saved) {
        const set = new Set<number>(JSON.parse(saved));
        collectedRef.current = set;
        setCollectedBadges(set);
      }
    } catch {}

    enemiesRef.current = spawnEnemies(0, CANVAS_W);
  }, []);

  // Canvas uses fixed internal resolution (960x540) for consistent gameplay.
  // CSS handles responsive scaling via width:100% + aspect-ratio.

  const changeLevel = useCallback(
    (dir: 1 | -1) => {
      if (transitionRef.current) return;
      const next = levelRef.current + dir;
      if (next < 0 || next >= LEVELS.length) return;

      transitionRef.current = true;
      setTransitioning(true);

      setTimeout(() => {
        levelRef.current = next;
        setCurrentLevel(next);
        const p = playerRef.current;
        p.x = dir === 1 ? 40 : CANVAS_W - CHAR_W - 40;
        p.y = 0;
        p.vy = 0;
        p.grounded = false;
        p.invincible = 0;
        enemiesRef.current = spawnEnemies(next, CANVAS_W);

        setTimeout(() => {
          transitionRef.current = false;
          setTransitioning(false);
        }, 200);
      }, 200);
    },
    []
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key);
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key);
    };
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gameLoop = (time: number) => {
      const dt = lastTimeRef.current ? Math.min(time - lastTimeRef.current, 32) : 16;
      lastTimeRef.current = time;

      const W = canvasSize.w;
      const H = canvasSize.h;
      const lvl = LEVELS[levelRef.current];
      const groundY = H - H * lvl.groundPct;

      const p = playerRef.current;
      const keys = keysRef.current;
      const touch = touchRef.current;

      if (!gameStartedRef.current) {
        const bgImg = bgImagesRef.current[0];
        if (bgImg && bgImg.complete) {
          ctx.drawImage(bgImg, 0, 0, W, H);
        }
        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.fillRect(0, 0, W, H);

        ctx.save();
        ctx.translate(W / 2, H * 0.30);

        ctx.shadowColor = "#00d4ff";
        ctx.shadowBlur = 40;
        ctx.font = "bold 32px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#00d4ff";
        ctx.fillText(finaleTextsRef.current.startTitle, 0, 0);
        ctx.shadowBlur = 0;

        ctx.font = "14px monospace";
        ctx.fillStyle = "#a1a1aa";
        ctx.fillText(finaleTextsRef.current.startSubtitle, 0, 40);

        const pulse = 0.6 + Math.sin(time * 0.003) * 0.4;

        ctx.font = "bold 18px monospace";
        ctx.fillStyle = `rgba(168, 85, 247, ${pulse})`;
        ctx.shadowColor = "#a855f7";
        ctx.shadowBlur = 15 * pulse;
        ctx.fillText("▶ " + finaleTextsRef.current.startButton, 0, 100);
        ctx.shadowBlur = 0;

        ctx.font = "11px monospace";
        ctx.fillStyle = "rgba(161, 161, 170, 0.5)";
        ctx.fillText(finaleTextsRef.current.startHint, 0, 145);

        ctx.restore();

        rafRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      if (gameOverRef.current) {
        const bgImg = bgImagesRef.current[levelRef.current];
        if (bgImg && bgImg.complete) {
          ctx.drawImage(bgImg, 0, 0, W, H);
        }
        ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
        ctx.fillRect(0, 0, W, H);

        ctx.save();
        ctx.translate(W / 2, H * 0.28);
        ctx.shadowColor = "#ef4444";
        ctx.shadowBlur = 30;
        ctx.font = "bold 40px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#ef4444";
        ctx.fillText(finaleTextsRef.current.gameOver, 0, 0);
        ctx.shadowBlur = 0;

        ctx.font = "18px monospace";
        ctx.fillStyle = "#71717a";
        ctx.fillText(`Level ${levelRef.current + 1}/${LEVELS.length}`, 0, 50);

        ctx.font = "14px monospace";
        ctx.fillStyle = "#a1a1aa";
        const pulse = 0.5 + Math.sin(time * 0.004) * 0.5;
        ctx.globalAlpha = pulse;
        ctx.fillText("▼", 0, 90);
        ctx.globalAlpha = 1;
        ctx.restore();

        rafRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      if (!transitionRef.current) {
        const left =
          keys.has("ArrowLeft") || keys.has("a") || keys.has("A") || touch.left;
        const right =
          keys.has("ArrowRight") || keys.has("d") || keys.has("D") || touch.right;
        const jumpPress =
          keys.has("ArrowUp") ||
          keys.has("w") ||
          keys.has("W") ||
          keys.has(" ") ||
          touch.jump;
        const downPress =
          keys.has("ArrowDown") ||
          keys.has("s") ||
          keys.has("S") ||
          touch.down;

        p.vx = 0;
        if (left) {
          p.vx = -RUN_SPEED;
          p.facingLeft = true;
        }
        if (right) {
          p.vx = RUN_SPEED;
          p.facingLeft = false;
        }

        if (jumpPress && p.grounded) {
          p.vy = JUMP_VEL;
          p.grounded = false;
        }

        if (downPress && p.grounded && p.y + CHAR_H < groundY - 2) {
          p.y += 6;
          p.grounded = false;
          p.vy = 1;
        }
      } else {
        p.vx = 0;
      }

      p.vy += GRAVITY;
      p.x += p.vx;
      p.y += p.vy;

      const isDropping = keys.has("ArrowDown") || keys.has("s") || keys.has("S") || touchRef.current.down;

      p.grounded = false;

      if (p.y + CHAR_H >= groundY) {
        p.y = groundY - CHAR_H;
        p.vy = 0;
        p.grounded = true;
      }

      const plats = lvl.platforms;
      const feetY = p.y + CHAR_H;
      const prevFeetY = feetY - p.vy;
      const playerCX = p.x + CHAR_W / 2;
      if (!isDropping) {
        for (const plat of plats) {
          const px = plat.xPct * W;
          const pw = plat.wPct * W;
          const platTop = groundY - plat.hAbove;

          if (
            playerCX >= px &&
            playerCX <= px + pw &&
            p.vy >= 0 &&
            prevFeetY <= platTop + 4 &&
            feetY >= platTop
          ) {
            p.y = platTop - CHAR_H;
            p.vy = 0;
            p.grounded = true;
            break;
          }
        }
      }

      const FINALE_LEVEL = LEVELS.length - 1;
      const curLvl = levelRef.current;
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
        setGameComplete(true);
      }

      let newAnim: AnimState;
      if (!p.grounded) {
        newAnim = "jump";
      } else if (p.vx !== 0) {
        newAnim = "run";
      } else {
        newAnim = "idle";
      }
      if (newAnim !== p.anim) {
        p.anim = newAnim;
        p.frame = 0;
        p.frameTimer = 0;
      }

      p.frameTimer += dt;
      const spd = ANIM_SPEED[p.anim];
      if (p.frameTimer >= spd) {
        p.frameTimer -= spd;
        p.frame = (p.frame + 1) % ANIM_FRAMES[p.anim];
      }

      ctx.clearRect(0, 0, W, H);

      const bgImg = bgImagesRef.current[levelRef.current];
      if (bgImg) {
        const imgAspect = bgImg.width / bgImg.height;
        const canAspect = W / H;
        let dw: number, dh: number, dx: number, dy: number;
        if (imgAspect > canAspect) {
          dh = H;
          dw = H * imgAspect;
          dx = (W - dw) / 2;
          dy = 0;
        } else {
          dw = W;
          dh = W / imgAspect;
          dx = 0;
          dy = H - dh;
        }
        ctx.drawImage(bgImg, dx, dy, dw, dh);
      } else {
        ctx.fillStyle = "#0a0a0f";
        ctx.fillRect(0, 0, W, H);
      }

      if (curLvl !== FINALE_LEVEL) {
        const floor = floorRef.current;
        const drawPlatform = (platX: number, platW: number, platY: number, h: number) => {
          if (!floor.left || !floor.mid || !floor.right) return;
          const edgeAspectL = floor.left.naturalWidth / floor.left.naturalHeight;
          const edgeAspectR = floor.right.naturalWidth / floor.right.naturalHeight;
          const edgeWL = Math.min(h * edgeAspectL, platW * 0.3);
          const edgeWR = Math.min(h * edgeAspectR, platW * 0.3);

          ctx.drawImage(floor.left, platX, platY, edgeWL, h);
          ctx.drawImage(floor.right, platX + platW - edgeWR, platY, edgeWR, h);

          const midAspect = floor.mid.naturalWidth / floor.mid.naturalHeight;
          const midW = h * midAspect;
          const midStart = platX + edgeWL;
          const midEnd = platX + platW - edgeWR;
          let mx = midStart;
          while (mx < midEnd) {
            const drawW = Math.min(midW, midEnd - mx);
            ctx.drawImage(
              floor.mid,
              0, 0,
              floor.mid.naturalWidth * (drawW / midW), floor.mid.naturalHeight,
              mx, platY, drawW, h,
            );
            mx += midW;
          }
        };

        if (floor.left && floor.mid && floor.right) {
          const floorH = 50;
          drawPlatform(0, W, groundY - floorH * 0.3, floorH);

          for (const plat of lvl.platforms) {
            const px = plat.xPct * W;
            const pw = plat.wPct * W;
            const platTop = groundY - plat.hAbove;
            drawPlatform(px, pw, platTop - 10, 35);
          }
        }

        if (p.invincible > 0) p.invincible = Math.max(0, p.invincible - dt);

        for (const enemy of enemiesRef.current) {
          if (enemy.alive) {
            enemy.x += enemy.vx;
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
              p.vy = JUMP_VEL * 0.55;
              p.grounded = false;
            } else if (p.invincible <= 0) {
              const pRight = p.x + CHAR_W;
              const hitX = pRight > ex + margin && p.x < ex + ENEMY_SIZE - margin;
              const hitY = pFeetY > ey + margin && p.y < ey + ENEMY_SIZE - margin;
              if (hitX && hitY) {
                p.hp = Math.max(0, p.hp - 1);
                p.invincible = INVINCIBLE_MS;
                p.vx = pCX < eCX ? -8 : 8;
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
            if (enemy.deathTimer < 400) {
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

        tooltipRef.current = null;
        const mx = mouseRef.current.x, my = mouseRef.current.y;
        if (mx >= 0 && my >= 0) {
          for (const enemy of enemiesRef.current) {
            if (!enemy.alive) continue;
            let ey2: number;
            if (enemy.platformIdx >= 0) {
              const pl = lvl.platforms[enemy.platformIdx];
              ey2 = pl ? groundY - pl.hAbove - ENEMY_SIZE : groundY - ENEMY_SIZE;
            } else {
              ey2 = groundY - ENEMY_SIZE;
            }
            const ex2 = enemy.x;
            if (mx >= ex2 && mx <= ex2 + ENEMY_SIZE && my >= ey2 && my <= ey2 + ENEMY_SIZE) {
              const label = finaleTextsRef.current.enemies[enemy.type] || enemy.type;
              tooltipRef.current = { text: label, x: ex2 + ENEMY_SIZE / 2, y: ey2 - 12 };
              break;
            }
          }
        }

        if (tooltipRef.current) {
          const tip = tooltipRef.current;
          ctx.save();
          ctx.font = "bold 11px monospace";
          ctx.textAlign = "center";
          const tw = ctx.measureText(tip.text).width + 14;
          const th = 20;
          const tx = Math.max(tw / 2, Math.min(tip.x, W - tw / 2));
          const ty = Math.max(th + 4, tip.y);
          ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
          ctx.beginPath();
          ctx.roundRect(tx - tw / 2, ty - th, tw, th, 4);
          ctx.fill();
          ctx.strokeStyle = "rgba(0, 240, 255, 0.4)";
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.fillStyle = "#e0e7ff";
          ctx.textBaseline = "middle";
          ctx.fillText(tip.text, tx, ty - th / 2);
          ctx.restore();
        }

        const lvlIdx = levelRef.current;
        if (!collectedRef.current.has(lvlIdx)) {
          const badgePlatIdx = BADGE_PLATFORM_IDX[lvlIdx];
          const bPlat = lvl.platforms[badgePlatIdx];
          if (bPlat) {
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

            drawBadgeIcon(ctx, lvlIdx, bx, by, BADGE_R * 0.6);

            const pcx = p.x + CHAR_W / 2;
            const pcy = p.y + CHAR_H / 2;
            const dist = Math.sqrt((pcx - bx) ** 2 + (pcy - by) ** 2);
            if (dist < CHAR_W / 2 + BADGE_R) {
              collectedRef.current.add(lvlIdx);
              const newSet = new Set(collectedRef.current);
              setCollectedBadges(newSet);
              try { localStorage.setItem("journey-badges", JSON.stringify([...newSet])); } catch {}
              collectFxRef.current = { x: bx, y: by, elapsed: 0 };
              p.hp = Math.min(p.maxHp, p.hp + 2);
            }
          }
        }

        const fx = collectFxRef.current;
        if (fx && fx.elapsed < 600) {
          fx.elapsed += dt;
          const prog = fx.elapsed / 600;
          const fxR = BADGE_R * (1 + prog * 4);
          const alpha = 1 - prog;
          ctx.beginPath();
          ctx.arc(fx.x, fx.y, fxR, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 3 * (1 - prog);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(fx.x, fx.y, fxR * 0.6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(167, 139, 250, ${alpha})`;
          ctx.lineWidth = 2 * (1 - prog);
          ctx.stroke();
        }

        const frameImgs = spriteFramesRef.current[p.anim];
        const spriteIdx = p.anim === "idle" ? IDLE_SEQUENCE[p.frame % IDLE_SEQUENCE.length] : p.frame;
        const frameImg = frameImgs[spriteIdx];
        const showPlayer = p.invincible <= 0 || Math.floor(p.invincible / 80) % 2 === 0;
        if (frameImg && frameImg.complete && frameImg.naturalWidth > 0 && showPlayer) {
          ctx.save();
          if (p.facingLeft) {
            ctx.translate(p.x + CHAR_W, p.y);
            ctx.scale(-1, 1);
            ctx.drawImage(frameImg, 0, 0, CHAR_W, CHAR_H);
          } else {
            ctx.drawImage(frameImg, p.x, p.y, CHAR_W, CHAR_H);
          }
          ctx.restore();
        }

        const hpBarW = CHAR_W * 1.1;
        const hpBarH = 6;
        const hpBarX = p.x + CHAR_W / 2 - hpBarW / 2;
        const hpBarY = p.y - 12;
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(hpBarX - 1, hpBarY - 1, hpBarW + 2, hpBarH + 2);
        const hpPct = p.hp / p.maxHp;
        const hpColor = hpPct > 0.5 ? "#22c55e" : hpPct > 0.25 ? "#eab308" : "#ef4444";
        ctx.fillStyle = hpColor;
        ctx.fillRect(hpBarX, hpBarY, hpBarW * hpPct, hpBarH);
        ctx.strokeStyle = "rgba(255,255,255,0.3)";
        ctx.lineWidth = 0.5;
        ctx.strokeRect(hpBarX - 1, hpBarY - 1, hpBarW + 2, hpBarH + 2);

        if (curLvl === FINALE_LEVEL - 1 && collectedRef.current.has(FINALE_LEVEL - 1)) {
          const arrowX = W - 50 + Math.sin(time * 0.005) * 8;
          const arrowY = groundY - CHAR_H * 0.7;
          const arrowAlpha = 0.6 + Math.sin(time * 0.004) * 0.3;

          ctx.save();
          ctx.globalAlpha = arrowAlpha;
          ctx.shadowColor = "#00f0ff";
          ctx.shadowBlur = 15;

          ctx.beginPath();
          ctx.moveTo(arrowX - 20, arrowY - 12);
          ctx.lineTo(arrowX, arrowY);
          ctx.lineTo(arrowX - 20, arrowY + 12);
          ctx.strokeStyle = "#00f0ff";
          ctx.lineWidth = 3;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(arrowX - 35, arrowY - 12);
          ctx.lineTo(arrowX - 15, arrowY);
          ctx.lineTo(arrowX - 35, arrowY + 12);
          ctx.globalAlpha = arrowAlpha * 0.5;
          ctx.stroke();

          ctx.restore();
        }
      } else {
        ctx.save();
        ctx.fillStyle = "rgba(10, 10, 15, 0.35)";
        ctx.fillRect(0, 0, W, H);

        const pulse = 0.95 + Math.sin(time * 0.002) * 0.05;
        ctx.save();
        ctx.translate(W / 2, H * 0.17);
        ctx.scale(pulse, pulse);

        ctx.shadowColor = "#00f0ff";
        ctx.shadowBlur = 20;
        ctx.font = "bold 28px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#00f0ff";
        const ft = finaleTextsRef.current;
        ctx.fillText(ft.complete, 0, 0);

        ctx.shadowBlur = 0;
        ctx.font = "16px monospace";
        ctx.fillStyle = "#a78bfa";
        ctx.fillText(`${collectedRef.current.size}/${BADGE_LABELS.length} ${ft.badges}`, 0, 35);

        ctx.shadowColor = "#00f0ff";
        ctx.shadowBlur = 25;
        ctx.font = "bold italic 18px monospace";
        ctx.fillStyle = "#00f0ff";
        ctx.fillText(ft.forNow, 0, 68);
        ctx.shadowBlur = 40;
        ctx.fillText(ft.forNow, 0, 68);

        ctx.restore();

        const arrowY = H * 0.67 + Math.sin(time * 0.003) * 8;
        const arrowAlpha = 0.5 + Math.sin(time * 0.004) * 0.3;
        ctx.save();
        ctx.globalAlpha = arrowAlpha;
        ctx.shadowColor = "#00f0ff";
        ctx.shadowBlur = 12;
        ctx.strokeStyle = "#00f0ff";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.beginPath();
        ctx.moveTo(W / 2 - 14, arrowY);
        ctx.lineTo(W / 2, arrowY + 16);
        ctx.lineTo(W / 2 + 14, arrowY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(W / 2 - 14, arrowY + 14);
        ctx.lineTo(W / 2, arrowY + 30);
        ctx.lineTo(W / 2 + 14, arrowY + 14);
        ctx.globalAlpha = arrowAlpha * 0.4;
        ctx.stroke();

        ctx.restore();

        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(gameLoop);
    };

    rafRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [changeLevel]);

  const goToLevel = useCallback(
    (idx: number) => {
      if (transitionRef.current || idx === levelRef.current) return;
      transitionRef.current = true;
      setTransitioning(true);
      setTimeout(() => {
        levelRef.current = idx;
        setCurrentLevel(idx);
        const p = playerRef.current;
        p.x = 100;
        p.y = 0;
        p.vy = 0;
        p.grounded = false;
        p.invincible = 0;
        enemiesRef.current = spawnEnemies(idx, CANVAS_W);
        setTimeout(() => {
          transitionRef.current = false;
          setTransitioning(false);
        }, 200);
      }, 200);
    },
    []
  );

  useEffect(() => {
    const j = t.journey as Record<string, unknown>;
    finaleTextsRef.current = {
      complete: (j.complete as string) || "JORNADA COMPLETA",
      badges: (j.badges as string) || "insígnias",
      forNow: (j.forNow as string) || "por enquanto...",
      gameOver: (j.gameOver as string) || "GAME OVER",
      playAgain: (j.playAgain as string) || "↺ jogar novamente",
      tryAgain: (j.tryAgain as string) || "↺ tentar novamente",
      reset: (j.reset as string) || "↺ reset",
      terminalTitle: (j.terminalTitle as string) || "developer-journey.exe",
      startTitle: (j.startTitle as string) || "JORNADA DA DESENVOLVEDORA",
      startSubtitle: (j.startSubtitle as string) || "Uma aventura pela minha trajetória",
      startButton: (j.startButton as string) || "Iniciar Jornada",
      startHint: (j.startHint as string) || "Use ← → para mover, ↑ para pular, ↓ para descer",
      enemies: (j.enemies as Record<string, string>) || {},
    };
  }, [t]);

  const level = t.journey.levels[currentLevel];

  return (
    <section id="journey" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold gradient-text mb-4">
            {t.journey.title}
          </h2>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-neon-blue to-neon-purple rounded-full" />
        </motion.div>

        <motion.div
          ref={containerRef}
          className="relative rounded-2xl overflow-hidden neon-border mx-auto"
          style={{ maxWidth: CANVAS_W }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          tabIndex={0}
        >
          <div className="bg-dark-800/80 border-b border-neon-blue/10">
            <div className="px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="text-[10px] font-mono text-foreground/40 ml-2">
                  {finaleTextsRef.current.terminalTitle || "developer-journey.exe"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-neon-blue">
                  Level {currentLevel + 1}/{LEVELS.length}
                </span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentLevel}
                className="px-3 pb-3"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-start gap-2.5">
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center text-foreground/60">
                    {levelIconComponents[currentLevel]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded bg-neon-purple/15 text-neon-purple border border-neon-purple/25 tracking-wider uppercase">
                        {level.level}/{LEVELS.length}
                      </span>
                      <h3 className="font-display text-xs sm:text-sm font-bold text-foreground truncate">
                        {level.title}
                      </h3>
                    </div>
                    <p className="text-foreground/50 text-[11px] sm:text-xs leading-relaxed line-clamp-2">
                      {level.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative w-full" style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }}>
            <canvas
              ref={canvasRef}
              width={CANVAS_W}
              height={CANVAS_H}
              className="block w-full h-full"
              style={{
                imageRendering: "pixelated",
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const scaleX = canvasSize.w / rect.width;
                const scaleY = canvasSize.h / rect.height;
                mouseRef.current.x = (e.clientX - rect.left) * scaleX;
                mouseRef.current.y = (e.clientY - rect.top) * scaleY;
              }}
              onMouseLeave={() => {
                mouseRef.current.x = -1;
                mouseRef.current.y = -1;
              }}
            />

            <AnimatePresence>
              {!gameStarted && (
                <motion.div
                  className="absolute inset-0 z-50 flex flex-col items-center justify-center cursor-pointer"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => {
                    gameStartedRef.current = true;
                    setGameStarted(true);
                  }}
                >
                  <button
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-mono font-bold text-sm hover:shadow-lg hover:shadow-neon-blue/25 transition-all hover:scale-105"
                    onClick={(e) => {
                      e.stopPropagation();
                      gameStartedRef.current = true;
                      setGameStarted(true);
                    }}
                  >
                    ▶ {finaleTextsRef.current.startButton || "Iniciar Jornada"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {transitioning && (
                <motion.div
                  className="absolute inset-0 bg-background z-30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>

            {currentLevel === LEVELS.length - 1 && (
              <button
                onClick={() => {
                  collectedRef.current = new Set();
                  setCollectedBadges(new Set());
                  gameCompleteRef.current = false;
                  setGameComplete(false);
                  try { localStorage.removeItem("journey-badges"); } catch {}
                  levelRef.current = 0;
                  setCurrentLevel(0);
                  const p = playerRef.current;
                  p.x = 100;
                  p.y = 0;
                  p.vy = 0;
                  p.grounded = false;
                  p.hp = PLAYER_MAX_HP;
                  p.maxHp = PLAYER_MAX_HP;
                  p.invincible = 0;
                  transitionRef.current = false;
                  setTransitioning(false);
                  enemiesRef.current = spawnEnemies(0, CANVAS_W);
                }}
                className="absolute bottom-5 right-1 z-20 px-3 py-1.5 rounded-lg bg-dark-800/70 backdrop-blur border border-foreground/10 text-[11px] font-mono text-foreground/40 hover:text-neon-blue hover:border-neon-blue/30 transition-all"
              >
                {finaleTextsRef.current.playAgain}
              </button>
            )}

            {gameOver && (
              <div className="absolute inset-0 z-40 flex flex-col items-center justify-center">
                <button
                  onClick={() => {
                    gameOverRef.current = false;
                    setGameOver(false);
                    levelRef.current = 0;
                    setCurrentLevel(0);
                    const p = playerRef.current;
                    p.x = 100;
                    p.y = 0;
                    p.vy = 0;
                    p.vx = 0;
                    p.grounded = false;
                    p.hp = PLAYER_MAX_HP;
                    p.maxHp = PLAYER_MAX_HP;
                    p.invincible = 0;
                    transitionRef.current = false;
                    setTransitioning(false);
                    enemiesRef.current = spawnEnemies(0, CANVAS_W);
                  }}
                  className="mt-8 px-6 py-3 rounded-xl bg-red-600/80 backdrop-blur border border-red-400/30 text-white font-mono text-sm hover:bg-red-500 hover:border-red-400/50 transition-all animate-pulse"
                >
                  {finaleTextsRef.current.tryAgain}
                </button>
              </div>
            )}

            <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1">
              <button
                onClick={() => goToLevel(Math.max(0, currentLevel - 1))}
                disabled={currentLevel === 0}
                className="w-8 h-8 rounded-lg bg-dark-800/70 backdrop-blur border border-foreground/10 text-foreground/50 hover:text-neon-blue hover:border-neon-blue/30 transition-colors disabled:opacity-20 flex items-center justify-center text-sm"
              >
                ◀
              </button>
              <button
                onClick={() => goToLevel(Math.min(LEVELS.length - 1, currentLevel + 1))}
                disabled={currentLevel === LEVELS.length - 1}
                className="w-8 h-8 rounded-lg bg-dark-800/70 backdrop-blur border border-foreground/10 text-foreground/50 hover:text-neon-blue hover:border-neon-blue/30 transition-colors disabled:opacity-20 flex items-center justify-center text-sm"
              >
                ▶
              </button>
            </div>

            <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1 md:hidden">
              <button
                className="w-12 h-12 rounded-xl bg-dark-800/60 backdrop-blur border border-neon-blue/20 text-neon-blue text-lg flex items-center justify-center active:bg-neon-blue/20 select-none"
                onTouchStart={(e) => { e.preventDefault(); touchRef.current.left = true; }}
                onTouchEnd={() => { touchRef.current.left = false; }}
                onTouchCancel={() => { touchRef.current.left = false; }}
                onMouseDown={(e) => { e.preventDefault(); touchRef.current.left = true; }}
                onMouseUp={() => { touchRef.current.left = false; }}
                onMouseLeave={() => { touchRef.current.left = false; }}
              >
                ←
              </button>
              <button
                className="w-12 h-12 rounded-xl bg-dark-800/60 backdrop-blur border border-neon-blue/20 text-neon-blue text-lg flex items-center justify-center active:bg-neon-blue/20 select-none"
                onTouchStart={(e) => { e.preventDefault(); touchRef.current.right = true; }}
                onTouchEnd={() => { touchRef.current.right = false; }}
                onTouchCancel={() => { touchRef.current.right = false; }}
                onMouseDown={(e) => { e.preventDefault(); touchRef.current.right = true; }}
                onMouseUp={() => { touchRef.current.right = false; }}
                onMouseLeave={() => { touchRef.current.right = false; }}
              >
                →
              </button>
              <button
                className="w-12 h-12 rounded-xl bg-dark-800/60 backdrop-blur border border-neon-blue/20 text-neon-blue text-lg flex items-center justify-center active:bg-neon-blue/20 select-none"
                onTouchStart={(e) => { e.preventDefault(); touchRef.current.down = true; }}
                onTouchEnd={() => { touchRef.current.down = false; }}
                onTouchCancel={() => { touchRef.current.down = false; }}
                onMouseDown={(e) => { e.preventDefault(); touchRef.current.down = true; }}
                onMouseUp={() => { touchRef.current.down = false; }}
                onMouseLeave={() => { touchRef.current.down = false; }}
              >
                ↓
              </button>
              <button
                className="w-12 h-12 rounded-xl bg-dark-800/60 backdrop-blur border border-neon-purple/20 text-neon-purple text-lg flex items-center justify-center active:bg-neon-purple/20 select-none ml-2"
                onTouchStart={(e) => { e.preventDefault(); touchRef.current.jump = true; }}
                onTouchEnd={() => { touchRef.current.jump = false; }}
                onTouchCancel={() => { touchRef.current.jump = false; }}
                onMouseDown={(e) => { e.preventDefault(); touchRef.current.jump = true; }}
                onMouseUp={() => { touchRef.current.jump = false; }}
                onMouseLeave={() => { touchRef.current.jump = false; }}
              >
                ↑
              </button>
            </div>

            <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col items-center gap-1">
              {LEVELS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToLevel(i)}
                  className={`w-7 h-7 rounded text-[10px] font-mono font-bold transition-all ${
                    currentLevel === i
                      ? "bg-neon-blue/20 text-neon-blue border border-neon-blue/40 shadow-[0_0_8px_rgba(0,240,255,0.3)]"
                      : "bg-dark-800/50 text-foreground/20 hover:text-foreground/50 border border-transparent"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-dark-800/50 px-3 py-2 border-t border-neon-blue/10">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-mono text-foreground/25">
                ← → Move | ↑ Space Jump
              </span>
              <span className="text-[9px] font-mono text-foreground/25">
                Walk to edges to change level
              </span>
            </div>
            <div className="flex items-center gap-1 justify-center flex-wrap">
              {BADGE_LABELS.map((label, i) => {
                const collected = collectedBadges.has(i);
                return (
                  <div
                    key={i}
                    className="group relative"
                  >
                    <div
                      className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-[9px] font-mono font-bold transition-all ${
                        collected
                          ? "border-neon-blue bg-neon-blue/15 text-neon-blue shadow-[0_0_8px_rgba(0,240,255,0.4)]"
                          : "border-foreground/10 bg-dark-900/50 text-foreground/15"
                      }`}
                    >
                      {collected ? "✓" : i + 1}
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-dark-800 border border-neon-blue/20 rounded text-[8px] font-mono text-foreground/60 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                      {label}
                    </div>
                  </div>
                );
              })}
              <span className="text-[9px] font-mono text-foreground/30 ml-1">
                {collectedBadges.size}/{BADGE_LABELS.length}
              </span>
            </div>
            <div className="flex justify-end mt-1">
              <button
                onClick={() => {
                  collectedRef.current = new Set();
                  setCollectedBadges(new Set());
                  gameCompleteRef.current = false;
                  setGameComplete(false);
                  try { localStorage.removeItem("journey-badges"); } catch {}
                  levelRef.current = 0;
                  setCurrentLevel(0);
                  const p2 = playerRef.current;
                  p2.x = 100;
                  p2.y = 0;
                  p2.vy = 0;
                  p2.grounded = false;
                  p2.hp = PLAYER_MAX_HP;
                  p2.maxHp = PLAYER_MAX_HP;
                  p2.invincible = 0;
                  transitionRef.current = false;
                  setTransitioning(false);
                  enemiesRef.current = spawnEnemies(0, CANVAS_W);
                }}
                className="text-[9px] font-mono text-foreground/20 hover:text-red-400 border border-transparent hover:border-red-400/30 rounded px-1.5 py-0.5 transition-all"
                title="Reset game"
              >
                {finaleTextsRef.current.reset}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
