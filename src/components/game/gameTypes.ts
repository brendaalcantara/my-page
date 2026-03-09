/** A raised platform defined as fractions of canvas width and absolute pixel height. */
export interface Platform {
  /** Left edge as a fraction of canvas width (0–1). */
  xPct: number;
  /** Width as a fraction of canvas width (0–1). */
  wPct: number;
  /** How many pixels above the ground floor the platform top sits. */
  hAbove: number;
}

/** Animation state for the player character. */
export type AnimState = "idle" | "run" | "jump";

/** Enemy archetype identifier — maps to a unique canvas-drawn sprite. */
export type EnemyType =
  | "virus"
  | "money"
  | "clock"
  | "doubt"
  | "saudade"
  | "daydream"
  | "bug"
  | "cart"
  | "adapt"
  | "alert";

/** Mutable runtime state for the player, updated every frame. */
export interface PlayerState {
  /** Horizontal position (left edge of sprite) in canvas pixels. */
  x: number;
  /** Vertical position (top edge of sprite) in canvas pixels. */
  y: number;
  /** Horizontal velocity in px/frame. */
  vx: number;
  /** Vertical velocity in px/frame (positive = downward). */
  vy: number;
  /** Whether the player is standing on a surface this frame. */
  grounded: boolean;
  /** Whether the sprite should be rendered flipped horizontally. */
  facingLeft: boolean;
  /** Current animation state driving sprite sheet selection. */
  anim: AnimState;
  /** Current frame index within the active animation. */
  frame: number;
  /** Accumulated time (ms) towards the next frame advance. */
  frameTimer: number;
  /** Current hit points. Game over when this reaches 0. */
  hp: number;
  /** Maximum hit points. */
  maxHp: number;
  /** Remaining invincibility time in ms after taking a hit. */
  invincible: number;
}

/** Static definition of an enemy placed in a level. */
export interface EnemyDef {
  /** Enemy archetype to render. */
  type: EnemyType;
  /** Initial X position as a fraction of canvas width. */
  xPct: number;
  /** Left patrol boundary as a fraction of canvas width. */
  patrolMinPct: number;
  /** Right patrol boundary as a fraction of canvas width. */
  patrolMaxPct: number;
  /** Movement speed in px/frame. */
  speed: number;
  /** Index into the level's platforms array; -1 for ground level. */
  platformIdx?: number;
}

/** Resolved floor tile images used for platform rendering. */
export interface FloorImages {
  left: HTMLImageElement | null;
  mid: HTMLImageElement | null;
  right: HTMLImageElement | null;
}

/** Translatable strings passed into canvas rendering functions via a ref. */
export interface FinaleTexts {
  complete: string;
  badges: string;
  forNow: string;
  gameOver: string;
  playAgain: string;
  tryAgain: string;
  reset: string;
  terminalTitle: string;
  startTitle: string;
  startSubtitle: string;
  startButton: string;
  startHint: string;
  enemies: Record<string, string>;
  badgeLabels: string[];
}

/** Mutable runtime state for a spawned enemy, updated every frame. */
export interface LiveEnemy {
  /** Current horizontal position (left edge) in canvas pixels. */
  x: number;
  /** Current horizontal velocity in px/frame (sign encodes direction). */
  vx: number;
  /** False once the player stomps the enemy; triggers death animation. */
  alive: boolean;
  /** Enemy archetype used for rendering. */
  type: EnemyType;
  /** Accumulated time (ms) since death, drives the fade-out animation. */
  deathTimer: number;
  /** Left patrol boundary in canvas pixels. */
  patrolMin: number;
  /** Right patrol boundary in canvas pixels. */
  patrolMax: number;
  /** Index into level platforms array; -1 means the enemy patrols the ground. */
  platformIdx: number;
}
