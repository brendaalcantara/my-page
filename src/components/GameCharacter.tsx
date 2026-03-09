"use client";

import { useEffect, useState } from "react";
import { ANIMATIONS, IDLE_SEQUENCE } from "./game/gameLevels";

export type CharAnimation = "idle" | "run" | "jump";

export { ANIMATIONS, IDLE_SEQUENCE };

const SPRITE_W = 422;
const SPRITE_H = 640;
const ASPECT = SPRITE_W / SPRITE_H;
const BASE_HEIGHT = 115;

export default function GameCharacter({
  animation = "idle",
  facingLeft = false,
  scale = 1,
  className = "",
}: {
  animation?: CharAnimation;
  facingLeft?: boolean;
  scale?: number;
  className?: string;
}) {
  const [seqIdx, setSeqIdx] = useState(0);

  const frames = ANIMATIONS[animation];

  useEffect(() => {
    frames.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [frames]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset frame index when animation prop changes
    setSeqIdx(0);
    const speed = animation === "idle" ? 500 : animation === "run" ? 100 : 180;
    const totalFrames = animation === "idle" ? IDLE_SEQUENCE.length : frames.length;
    const interval = setInterval(() => {
      setSeqIdx((prev) => (prev + 1) % totalFrames);
    }, speed);
    return () => clearInterval(interval);
  }, [animation, frames]);

  const displayFrame = animation === "idle" ? IDLE_SEQUENCE[seqIdx % IDLE_SEQUENCE.length] : seqIdx;
  const h = BASE_HEIGHT * scale;
  const w = h * ASPECT;

  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{
        width: w,
        height: h,
        transform: facingLeft ? "scaleX(-1)" : undefined,
        position: "relative",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- sprite animation needs raw img for dynamic src switching */}
      <img
        src={frames[displayFrame]}
        alt=""
        draggable={false}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "bottom center",
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}
