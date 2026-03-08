"use client";

import GameCharacter from "./GameCharacter";

export default function SpriteAvatar() {
  return (
    <div className="relative animate-float">
      <GameCharacter animation="idle" scale={2} />
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-neon-blue/20 rounded-full blur-md" />
    </div>
  );
}
