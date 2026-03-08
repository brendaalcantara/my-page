"use client";

import { useEffect, useState } from "react";

export type CharAnimation = "idle" | "run" | "jump";

export const ANIMATIONS: Record<CharAnimation, string[]> = {
  idle: [
    "/images/person/parada-normal.png",
    "/images/person/parada-com-no-oculos.png",
    "/images/person/parada-maos-na-cintura.png",
  ],
  run: [
    "/images/person/preparado-para-correr-direita.png",
    "/images/person/inicio-corrida-direita.png",
    "/images/person/correndo-forte-direita.png",
  ],
  jump: [
    "/images/person/se-preparando-para-pular.png",
    "/images/person/logo-apos-pular.png",
    "/images/person/ponto-mais-alto-do-pulo.png",
    "/images/person/comecando-a-descer-do-pulo-Photoroom.png",
    "/images/person/final-do-pulo-pousando1.png",
  ],
};

export const ANIM_FRAME_COUNTS: Record<CharAnimation, number> = {
  idle: ANIMATIONS.idle.length,
  run: ANIMATIONS.run.length,
  jump: ANIMATIONS.jump.length,
};

const SPRITE_W = 422;
const SPRITE_H = 640;
const ASPECT = SPRITE_W / SPRITE_H;
const BASE_HEIGHT = 115;

const IDLE_SEQUENCE = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  2, 2, 2,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 1,
  0, 0, 0, 0, 0, 0, 0, 0,
];

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
      {frames.map((src, i) => (
        <img
          key={src}
          src={src}
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
            opacity: i === displayFrame ? 1 : 0,
          }}
        />
      ))}
    </div>
  );
}
