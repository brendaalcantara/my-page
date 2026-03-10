"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

interface TerminalLine {
  type: "input" | "output";
  content: string;
}

export default function Terminal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const prevActiveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      prevActiveRef.current = document.activeElement as HTMLElement | null;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: reset terminal content when opened
      setLines([{ type: "output", content: t.terminal.welcome }]);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else if (prevActiveRef.current) {
      prevActiveRef.current.focus();
      prevActiveRef.current = null;
    }
  }, [isOpen, t.terminal.welcome]);

  const handleClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;
    const dialog = dialogRef.current;
    const focusables = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    dialog.addEventListener("keydown", handleKeyDown);
    return () => dialog.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  const executeCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      const commands = t.terminal.commands;

      let output: string;
      if (trimmed === "clear") {
        setLines([]);
        return;
      } else if (trimmed in commands) {
        output = commands[trimmed as keyof typeof commands];
      } else if (trimmed === "") {
        output = "";
      } else {
        output = commands.unknown;
      }

      setLines((prev) => [
        ...prev,
        { type: "input", content: cmd },
        ...(output ? [{ type: "output" as const, content: output }] : []),
      ]);
    },
    [t.terminal.commands]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim()) {
      executeCommand(input);
      setHistory((prev) => [input, ...prev]);
      setHistoryIdx(-1);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIdx < history.length - 1) {
        const newIdx = historyIdx + 1;
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const newIdx = historyIdx - 1;
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      } else {
        setHistoryIdx(-1);
        setInput("");
      }
    } else if (e.key === "Escape") {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="terminal-title"
            className="relative w-full max-w-3xl max-h-[80vh] terminal-screen rounded-xl overflow-hidden shadow-2xl shadow-neon-blue/10"
            initial={{ scale: 0.9, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 40 }}
          >
            <div className="flex items-center justify-between px-4 py-2.5 bg-dark-800/80 border-b border-neon-blue/20">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <button
                    onClick={handleClose}
                    aria-label={t.terminal.closeLabel}
                    className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
                  />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span id="terminal-title" className="text-xs font-mono text-foreground/40 ml-3">
                  {t.terminal.prompt} — {t.terminal.bash}
                </span>
              </div>
              <button
                onClick={handleClose}
                className="text-foreground/40 hover:text-foreground/80 text-xs font-mono"
              >
                [ESC]
              </button>
            </div>

            <div
              ref={outputRef}
              className="p-4 h-[60vh] overflow-y-auto text-sm"
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((line, idx) => (
                <div key={idx} className="mb-1">
                  {line.type === "input" ? (
                    <div className="flex items-center gap-2">
                      <span className="text-neon-green font-mono text-xs">
                        {t.terminal.prompt} $
                      </span>
                      <span className="text-foreground/80 font-mono">
                        {line.content}
                      </span>
                    </div>
                  ) : (
                    <pre className="text-foreground/60 font-mono whitespace-pre-wrap text-xs leading-relaxed">
                      {line.content}
                    </pre>
                  )}
                </div>
              ))}

              <div className="flex items-center gap-2 mt-1">
                <span className="text-neon-green font-mono text-xs flex-shrink-0">
                  {t.terminal.prompt} $
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  aria-label={t.terminal.inputLabel}
                  className="flex-1 bg-transparent text-foreground/90 font-mono text-sm outline-none caret-neon-blue"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
