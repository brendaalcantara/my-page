import {
  ENEMY_DEATH_DURATION,
  BADGE_R, COLLECT_FX_DURATION,
  CHAR_W, CHAR_H, BLINK_INTERVAL_MS, HP_BAR_H, HP_BAR_OFFSET_Y,
  FLOOR_TILE_H, PLAT_TILE_H, IDLE_SEQUENCE, LEVELS,
} from "./gameLevels";
import type { EnemyType, AnimState, PlayerState, FloorImages, FinaleTexts, Platform } from "./gameTypes";

export function drawBadgeIcon(
  ctx: CanvasRenderingContext2D,
  level: number,
  cx: number,
  cy: number,
  r: number,
) {
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
    case 5:
      break;
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

export function drawEnemy(
  ctx: CanvasRenderingContext2D,
  type: EnemyType,
  cx: number,
  cy: number,
  r: number,
  time: number,
  alive: boolean,
  deathTimer: number,
) {
  ctx.save();

  if (!alive) {
    const prog = Math.min(deathTimer / ENEMY_DEATH_DURATION, 1);
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
    case "adapt": {
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.85, 0, Math.PI * 2);
      const adaptGrad = ctx.createRadialGradient(cx, cy - r * 0.2, 0, cx, cy, r);
      adaptGrad.addColorStop(0, "#4c1d95");
      adaptGrad.addColorStop(1, "#1e1b4b");
      ctx.fillStyle = adaptGrad;
      ctx.fill();
      ctx.strokeStyle = "#8b5cf6";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy - r * 0.2, r * 0.18, 0, Math.PI * 2);
      ctx.fillStyle = "#c4b5fd";
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(cx - r * 0.25, cy + r * 0.05);
      ctx.quadraticCurveTo(cx, cy - r * 0.15, cx + r * 0.25, cy + r * 0.05);
      ctx.lineTo(cx + r * 0.2, cy + r * 0.4);
      ctx.lineTo(cx - r * 0.2, cy + r * 0.4);
      ctx.closePath();
      ctx.fillStyle = "#c4b5fd";
      ctx.fill();

      const spin = Math.sin(time * 0.004) * 0.3;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(spin);
      ctx.font = `bold ${r * 0.35}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#a78bfa";
      ctx.fillText("</>", 0, -r * 0.55);
      ctx.restore();

      const qAlpha = 0.4 + Math.sin(time * 0.005) * 0.3;
      ctx.font = `bold ${r * 0.28}px monospace`;
      ctx.textAlign = "center";
      ctx.fillStyle = `rgba(196, 181, 253, ${qAlpha})`;
      ctx.fillText("?", cx - r * 0.55, cy + r * 0.5);
      ctx.fillText("!", cx + r * 0.55, cy + r * 0.5);
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

// ---------------------------------------------------------------------------
// Screen / world render helpers (moved here from useJourneyGame to keep the
// hook slim and these pure-drawing functions independently testable).
// ---------------------------------------------------------------------------

export function renderStartScreen(
  ctx: CanvasRenderingContext2D,
  bgImg: HTMLImageElement | null,
  texts: FinaleTexts,
  W: number, H: number,
  time: number,
) {
  if (bgImg && bgImg.complete) ctx.drawImage(bgImg, 0, 0, W, H);
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
  ctx.fillText(texts.startTitle, 0, 0);
  ctx.shadowBlur = 0;
  ctx.font = "14px monospace";
  ctx.fillStyle = "#a1a1aa";
  ctx.fillText(texts.startSubtitle, 0, 40);
  const pulse = 0.6 + Math.sin(time * 0.003) * 0.4;
  ctx.font = "bold 18px monospace";
  ctx.fillStyle = `rgba(168, 85, 247, ${pulse})`;
  ctx.shadowColor = "#a855f7";
  ctx.shadowBlur = 15 * pulse;
  ctx.fillText("▶ " + texts.startButton, 0, 100);
  ctx.shadowBlur = 0;
  ctx.font = "11px monospace";
  ctx.fillStyle = "rgba(161, 161, 170, 0.5)";
  ctx.fillText(texts.startHint, 0, 145);
  ctx.restore();
}

export function renderGameOverScreen(
  ctx: CanvasRenderingContext2D,
  bgImg: HTMLImageElement | null,
  texts: FinaleTexts,
  levelIdx: number,
  totalLevels: number,
  W: number, H: number,
  time: number,
) {
  if (bgImg && bgImg.complete) ctx.drawImage(bgImg, 0, 0, W, H);
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
  ctx.fillText(texts.gameOver, 0, 0);
  ctx.shadowBlur = 0;
  ctx.font = "18px monospace";
  ctx.fillStyle = "#71717a";
  ctx.fillText(`Level ${levelIdx + 1}/${totalLevels}`, 0, 50);
  ctx.font = "14px monospace";
  ctx.fillStyle = "#a1a1aa";
  const pulse = 0.5 + Math.sin(time * 0.004) * 0.5;
  ctx.globalAlpha = pulse;
  ctx.fillText("▼", 0, 90);
  ctx.globalAlpha = 1;
  ctx.restore();
}

export function drawBackground(
  ctx: CanvasRenderingContext2D,
  bgImg: HTMLImageElement | null,
  W: number, H: number,
) {
  if (bgImg) {
    const imgAspect = bgImg.width / bgImg.height;
    const canAspect = W / H;
    let dw: number, dh: number, dx: number, dy: number;
    if (imgAspect > canAspect) {
      dh = H; dw = H * imgAspect; dx = (W - dw) / 2; dy = 0;
    } else {
      dw = W; dh = W / imgAspect; dx = 0; dy = H - dh;
    }
    ctx.drawImage(bgImg, dx, dy, dw, dh);
  } else {
    ctx.fillStyle = "#0a0a0f";
    ctx.fillRect(0, 0, W, H);
  }
}

function drawPlatformTiles(
  ctx: CanvasRenderingContext2D,
  floor: FloorImages,
  platX: number, platW: number, platY: number, h: number,
) {
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
      0, 0, floor.mid.naturalWidth * (drawW / midW), floor.mid.naturalHeight,
      mx, platY, drawW, h,
    );
    mx += midW;
  }
}

export function drawAllPlatforms(
  ctx: CanvasRenderingContext2D,
  floor: FloorImages,
  lvl: { platforms: Platform[] },
  groundY: number,
  W: number,
) {
  if (!floor.left || !floor.mid || !floor.right) return;
  drawPlatformTiles(ctx, floor, 0, W, groundY - FLOOR_TILE_H * 0.3, FLOOR_TILE_H);
  for (const plat of lvl.platforms) {
    const px = plat.xPct * W;
    const pw = plat.wPct * W;
    const platTop = groundY - plat.hAbove;
    drawPlatformTiles(ctx, floor, px, pw, platTop - 10, PLAT_TILE_H);
  }
}

export function drawPlayer(
  ctx: CanvasRenderingContext2D,
  spriteFrames: Record<AnimState, HTMLImageElement[]>,
  p: PlayerState,
) {
  const frameImgs = spriteFrames[p.anim];
  const spriteIdx = p.anim === "idle" ? IDLE_SEQUENCE[p.frame % IDLE_SEQUENCE.length] : p.frame;
  const frameImg = frameImgs[spriteIdx];
  const showPlayer = p.invincible <= 0 || Math.floor(p.invincible / BLINK_INTERVAL_MS) % 2 === 0;
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
  const hpBarX = p.x + CHAR_W / 2 - hpBarW / 2;
  const hpBarY = p.y - HP_BAR_OFFSET_Y;
  ctx.fillStyle = "rgba(0,0,0,0.6)";
  ctx.fillRect(hpBarX - 1, hpBarY - 1, hpBarW + 2, HP_BAR_H + 2);
  const hpPct = p.hp / p.maxHp;
  const hpColor = hpPct > 0.5 ? "#22c55e" : hpPct > 0.25 ? "#eab308" : "#ef4444";
  ctx.fillStyle = hpColor;
  ctx.fillRect(hpBarX, hpBarY, hpBarW * hpPct, HP_BAR_H);
  ctx.strokeStyle = "rgba(255,255,255,0.3)";
  ctx.lineWidth = 0.5;
  ctx.strokeRect(hpBarX - 1, hpBarY - 1, hpBarW + 2, HP_BAR_H + 2);
}

export function drawNextLevelArrow(
  ctx: CanvasRenderingContext2D,
  curLvl: number,
  lastBadgeCollected: boolean,
  groundY: number,
  time: number,
  W: number,
) {
  const FINALE_LEVEL = LEVELS.length - 1;
  if (curLvl !== FINALE_LEVEL - 1 || !lastBadgeCollected) return;
  const arrowX = W - 50 + Math.sin(time * 0.005) * 8;
  const arrowY = groundY - CHAR_H * 0.7;
  const arrowAlpha = 0.6 + Math.sin(time * 0.004) * 0.3;
  ctx.save();
  ctx.globalAlpha = arrowAlpha;
  ctx.shadowColor = "#00f0ff";
  ctx.shadowBlur = 15;
  ctx.strokeStyle = "#00f0ff";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(arrowX - 20, arrowY - 12);
  ctx.lineTo(arrowX, arrowY);
  ctx.lineTo(arrowX - 20, arrowY + 12);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(arrowX - 35, arrowY - 12);
  ctx.lineTo(arrowX - 15, arrowY);
  ctx.lineTo(arrowX - 35, arrowY + 12);
  ctx.globalAlpha = arrowAlpha * 0.5;
  ctx.stroke();
  ctx.restore();
}

export function renderFinaleScreen(
  ctx: CanvasRenderingContext2D,
  texts: FinaleTexts,
  collectedSize: number,
  W: number, H: number,
  time: number,
) {
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
  ctx.fillText(texts.complete, 0, 0);
  ctx.shadowBlur = 0;
  ctx.font = "16px monospace";
  ctx.fillStyle = "#a78bfa";
  ctx.fillText(`${collectedSize}/${texts.badgeLabels.length} ${texts.badges}`, 0, 35);
  ctx.shadowColor = "#00f0ff";
  ctx.shadowBlur = 25;
  ctx.font = "bold italic 18px monospace";
  ctx.fillStyle = "#00f0ff";
  ctx.fillText(texts.forNow, 0, 68);
  ctx.shadowBlur = 40;
  ctx.fillText(texts.forNow, 0, 68);
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

export function drawCollectFx(
  ctx: CanvasRenderingContext2D,
  fx: { x: number; y: number; elapsed: number } | null,
  dt: number,
) {
  if (!fx || fx.elapsed >= COLLECT_FX_DURATION) return;
  fx.elapsed += dt;
  const prog = fx.elapsed / COLLECT_FX_DURATION;
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
