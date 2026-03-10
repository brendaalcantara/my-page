"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { levelIcons } from "./Icons";
import { CANVAS_W, CANVAS_H, LEVELS } from "./game/gameLevels";
import { FINALE_IDX, useJourneyGame } from "@/hooks/useJourneyGame";

function GamepadButton({
  label,
  onActivate,
  onDeactivate,
  variant = "blue",
  className = "",
}: {
  label: string;
  onActivate: () => void;
  onDeactivate: () => void;
  variant?: "blue" | "purple";
  className?: string;
}) {
  const colors =
    variant === "purple"
      ? "border-neon-purple/40 text-neon-purple bg-neon-purple/10 active:bg-neon-purple/30 shadow-[0_0_12px_rgba(168,85,247,0.2)]"
      : "border-neon-blue/30 text-neon-blue bg-neon-blue/5 active:bg-neon-blue/20";
  return (
    <button
      className={`rounded-2xl backdrop-blur border ${colors} flex items-center justify-center select-none touch-none transition-transform active:scale-95 ${className}`}
      onTouchStart={(e) => { e.preventDefault(); onActivate(); }}
      onTouchEnd={onDeactivate}
      onTouchCancel={onDeactivate}
      onMouseDown={(e) => { e.preventDefault(); onActivate(); }}
      onMouseUp={onDeactivate}
      onMouseLeave={onDeactivate}
    >
      {label}
    </button>
  );
}

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
                    {(() => { const Icon = levelIcons[currentLevel]; return Icon ? <Icon size={22} /> : null; })()}
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

            {currentLevel !== FINALE_IDX && (
              <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1">
                <button
                  onClick={() => goToLevel(Math.max(0, currentLevel - 1))}
                  disabled={currentLevel === 0}
                  className="w-10 h-10 rounded-xl bg-dark-800/80 backdrop-blur border border-foreground/15 text-foreground/60 hover:text-neon-blue hover:border-neon-blue/40 transition-all disabled:opacity-15 flex items-center justify-center text-base font-bold"
                  title="Previous level"
                >
                  ◀
                </button>
                <span className="text-[9px] font-mono text-foreground/30 px-1 hidden sm:block">
                  {currentLevel + 1}/{LEVELS.length}
                </span>
                <button
                  onClick={() => goToLevel(Math.min(FINALE_IDX, currentLevel + 1))}
                  disabled={currentLevel === FINALE_IDX}
                  className="w-10 h-10 rounded-xl bg-dark-800/80 backdrop-blur border border-foreground/15 text-foreground/60 hover:text-neon-blue hover:border-neon-blue/40 transition-all disabled:opacity-15 flex items-center justify-center text-base font-bold"
                  title="Next level"
                >
                  ▶
                </button>
              </div>
            )}

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

          {currentLevel !== FINALE_IDX && gameStarted && !gameOver && (
            <div className="md:hidden bg-dark-900/80 border-t border-neon-blue/10 px-5 py-4">
              <div className="flex items-center justify-between max-w-xs mx-auto">

                {/* Left thumb: movement */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex gap-2">
                    <GamepadButton
                      label="←"
                      onActivate={() => { touchRef.current.left = true; }}
                      onDeactivate={() => { touchRef.current.left = false; }}
                      className="w-16 h-16 text-2xl"
                    />
                    <GamepadButton
                      label="→"
                      onActivate={() => { touchRef.current.right = true; }}
                      onDeactivate={() => { touchRef.current.right = false; }}
                      className="w-16 h-16 text-2xl"
                    />
                  </div>
                  <GamepadButton
                    label="↓  drop"
                    onActivate={() => { touchRef.current.down = true; }}
                    onDeactivate={() => { touchRef.current.down = false; }}
                    className="w-24 h-9 text-xs font-mono opacity-50"
                  />
                </div>

                {/* Right thumb: jump */}
                <GamepadButton
                  label="JUMP"
                  onActivate={() => { touchRef.current.jump = true; }}
                  onDeactivate={() => { touchRef.current.jump = false; }}
                  variant="purple"
                  className="w-20 h-20 rounded-full text-sm font-bold font-mono"
                />
              </div>
            </div>
          )}

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
