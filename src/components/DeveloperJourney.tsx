"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { levelIcons } from "./Icons";
import { CANVAS_W, CANVAS_H, LEVELS } from "./game/gameLevels";
import { FINALE_IDX, useJourneyGame } from "@/hooks/useJourneyGame";

// ── SVG icons ──────────────────────────────────────────────────────────────

function IconLeft() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function IconRight() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function IconJump() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  );
}

function IconDrop() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14" />
      <path d="M5 12l7 7 7-7" />
    </svg>
  );
}

function IconChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

// ── Gamepad button ──────────────────────────────────────────────────────────

function GamepadButton({
  children,
  onActivate,
  onDeactivate,
  variant = "blue",
  className = "",
  disabled = false,
}: {
  children: React.ReactNode;
  onActivate: () => void;
  onDeactivate: () => void;
  variant?: "blue" | "purple";
  className?: string;
  disabled?: boolean;
}) {
  const colors =
    variant === "purple"
      ? "border-neon-purple/50 text-neon-purple bg-neon-purple/15 active:bg-neon-purple/35 shadow-[0_0_14px_rgba(168,85,247,0.25)]"
      : "border-neon-blue/40 text-neon-blue bg-neon-blue/10 active:bg-neon-blue/25";
  return (
    <button
      disabled={disabled}
      className={`rounded-2xl backdrop-blur border ${colors} flex items-center justify-center select-none touch-none transition-transform active:scale-90 disabled:opacity-20 ${className}`}
      onTouchStart={(e) => { e.preventDefault(); onActivate(); }}
      onTouchEnd={(e) => { e.preventDefault(); onDeactivate(); }}
      onTouchCancel={(e) => { e.preventDefault(); onDeactivate(); }}
      onMouseDown={(e) => { e.preventDefault(); onActivate(); }}
      onMouseUp={onDeactivate}
      onMouseLeave={onDeactivate}
    >
      {children}
    </button>
  );
}

// ── Component ───────────────────────────────────────────────────────────────

export default function DeveloperJourney() {
  const { t } = useLanguage();
  const {
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
  } = useJourneyGame();

  const level = t.journey.levels[currentLevel];
  const j = t.journey;
  const badgeLabels = (j.badgeLabels as string[]) || [];
  const isPlaying = gameStarted && !gameOver && currentLevel !== FINALE_IDX;

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
          className="relative rounded-2xl overflow-hidden neon-border mx-auto"
          style={{ maxWidth: CANVAS_W }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          tabIndex={0}
        >
          {/* ── Header bar ── */}
          <div className="bg-dark-800/80 border-b border-neon-blue/10">
            <div className="px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="text-[10px] font-mono text-foreground/40 ml-2">
                  {j.terminalTitle || "developer-journey.exe"}
                </span>
              </div>
              <span className="text-[10px] font-mono text-neon-blue">
                Level {currentLevel + 1}/{LEVELS.length}
              </span>
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
                    {(() => { const Icon = levelIcons[currentLevel]; return Icon ? <Icon size={22} /> : null; })()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded bg-neon-purple/15 text-neon-purple border border-neon-purple/25 tracking-wider uppercase">
                        {level.level}/{LEVELS.length}
                      </span>
                      <h3 className="font-display text-xs sm:text-sm font-bold text-foreground truncate">
                        {level.title}
                      </h3>
                    </div>
                    <p className="sm:line-clamp-2 text-[11px] sm:text-xs leading-relaxed border-l-2 border-neon-blue/30 pl-2 text-foreground/70">
                      {level.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Canvas ── */}
          <div className="relative w-full" style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }}>
            <canvas
              ref={canvasRef}
              width={CANVAS_W}
              height={CANVAS_H}
              className="block w-full h-full"
              style={{ imageRendering: "pixelated" }}
            />

            <AnimatePresence>
              {!gameStarted && (
                <motion.div
                  className="absolute inset-0 z-50 flex flex-col items-center justify-center cursor-pointer"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  onClick={startGame}
                >
                  <button
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-mono font-bold text-sm hover:shadow-lg hover:shadow-neon-blue/25 transition-all hover:scale-105"
                    onClick={(e) => { e.stopPropagation(); startGame(); }}
                  >
                    ▶ {t.journey.startButton}
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

            {currentLevel === FINALE_IDX && (
              <button
                onClick={() => resetGame(true)}
                className="absolute bottom-5 right-1 z-20 px-3 py-1.5 rounded-lg bg-dark-800/70 backdrop-blur border border-foreground/10 text-[11px] font-mono text-foreground/40 hover:text-neon-blue hover:border-neon-blue/30 transition-all"
              >
                {j.playAgain}
              </button>
            )}

            {gameOver && (
              <div className="absolute inset-0 z-40 flex flex-col items-center justify-center">
                <button
                  onClick={() => resetGame(false)}
                  className="mt-8 px-6 py-3 rounded-xl bg-red-600/80 backdrop-blur border border-red-400/30 text-white font-mono text-sm hover:bg-red-500 hover:border-red-400/50 transition-all animate-pulse"
                >
                  {j.tryAgain}
                </button>
              </div>
            )}

            {/* Level nav arrows — desktop only (hidden on mobile, replaced by bar below) */}
            {currentLevel !== FINALE_IDX && (
              <div className="absolute bottom-2 left-2 z-20 hidden sm:flex items-center gap-1">
                <button
                  onClick={() => goToLevel(Math.max(0, currentLevel - 1))}
                  disabled={currentLevel === 0}
                  className="w-9 h-9 rounded-xl bg-dark-800/80 backdrop-blur border border-foreground/15 text-foreground/60 hover:text-neon-blue hover:border-neon-blue/40 transition-all disabled:opacity-15 flex items-center justify-center"
                  title="Previous level"
                >
                  <IconChevronLeft />
                </button>
                <span className="text-[9px] font-mono text-foreground/30 px-1">
                  {currentLevel + 1}/{LEVELS.length}
                </span>
                <button
                  onClick={() => goToLevel(Math.min(FINALE_IDX, currentLevel + 1))}
                  disabled={currentLevel === FINALE_IDX}
                  className="w-9 h-9 rounded-xl bg-dark-800/80 backdrop-blur border border-foreground/15 text-foreground/60 hover:text-neon-blue hover:border-neon-blue/40 transition-all disabled:opacity-15 flex items-center justify-center"
                  title="Next level"
                >
                  <IconChevronRight />
                </button>
              </div>
            )}

            {/* Level selector dots — desktop sidebar */}
            {currentLevel !== FINALE_IDX && (
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
            )}
          </div>

          {/* ── Mobile: level navigation bar ── */}
          {currentLevel !== FINALE_IDX && gameStarted && (
            <div className="sm:hidden flex items-center justify-between bg-dark-900/70 border-t border-neon-blue/10 px-3 py-2 gap-2">
              <button
                onClick={() => goToLevel(Math.max(0, currentLevel - 1))}
                disabled={currentLevel === 0}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-dark-800/80 border border-neon-blue/20 text-neon-blue disabled:opacity-20 disabled:border-foreground/10 disabled:text-foreground/30 transition-all active:scale-95 text-xs font-mono font-semibold"
              >
                <IconChevronLeft />
                <span>Prev</span>
              </button>

              <div className="flex items-center gap-1.5 flex-1 justify-center">
                {LEVELS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToLevel(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentLevel === i
                        ? "bg-neon-blue shadow-[0_0_6px_rgba(0,240,255,0.6)] scale-125"
                        : "bg-foreground/20 hover:bg-foreground/40"
                    }`}
                    title={`Level ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => goToLevel(Math.min(FINALE_IDX, currentLevel + 1))}
                disabled={currentLevel === FINALE_IDX}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-dark-800/80 border border-neon-blue/20 text-neon-blue disabled:opacity-20 disabled:border-foreground/10 disabled:text-foreground/30 transition-all active:scale-95 text-xs font-mono font-semibold"
              >
                <span>Next</span>
                <IconChevronRight />
              </button>
            </div>
          )}

          {/* ── Mobile: gamepad controls ── */}
          {isPlaying && (
            <div className="sm:hidden bg-dark-900/80 border-t border-neon-blue/10 px-5 py-4">
              <div className="flex items-end justify-between max-w-xs mx-auto">

                {/* Left thumb zone: move + drop */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex gap-2">
                    <GamepadButton
                      onActivate={() => { touchRef.current.left = true; }}
                      onDeactivate={() => { touchRef.current.left = false; }}
                      className="w-16 h-16"
                    >
                      <IconLeft />
                    </GamepadButton>
                    <GamepadButton
                      onActivate={() => { touchRef.current.right = true; }}
                      onDeactivate={() => { touchRef.current.right = false; }}
                      className="w-16 h-16"
                    >
                      <IconRight />
                    </GamepadButton>
                  </div>
                  <GamepadButton
                    onActivate={() => { touchRef.current.down = true; }}
                    onDeactivate={() => { touchRef.current.down = false; }}
                    className="w-28 h-8 opacity-50"
                  >
                    <IconDrop />
                  </GamepadButton>
                </div>

                {/* Right thumb zone: jump */}
                <GamepadButton
                  variant="purple"
                  onActivate={() => { touchRef.current.jump = true; }}
                  onDeactivate={() => { touchRef.current.jump = false; }}
                  className="w-20 h-20 rounded-full flex-col gap-0.5"
                >
                  <IconJump />
                  <span className="text-[10px] font-mono font-bold tracking-wider">{j.jump}</span>
                </GamepadButton>
              </div>
            </div>
          )}

          {/* ── Footer: badges + hints ── */}
          <div className="bg-dark-800/50 px-3 py-2 border-t border-neon-blue/10">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-mono text-foreground/25 hidden sm:block">
                ← → Move | ↑ Space Jump
              </span>
              <span className="text-[9px] font-mono text-foreground/25 hidden sm:block">
                Walk to edges to change level
              </span>
            </div>
            <div className="flex items-center gap-1 justify-center flex-wrap">
              {badgeLabels.map((label, i) => {
                const collected = collectedBadges.has(i);
                return (
                  <div key={i} className="group relative">
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
                {collectedBadges.size}/{badgeLabels.length}
              </span>
            </div>
            <div className="flex justify-end mt-1">
              <button
                onClick={() => resetGame(true)}
                className="text-[9px] font-mono text-foreground/20 hover:text-red-400 border border-transparent hover:border-red-400/30 rounded px-1.5 py-0.5 transition-all"
                title="Reset game"
              >
                {j.reset}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
