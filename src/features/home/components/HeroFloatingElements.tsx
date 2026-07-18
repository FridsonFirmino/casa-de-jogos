"use client";

import { useLottie } from "lottie-react";
import animationData from "../../../../public/animation/gamesIcon.json";

export function HeroFloatingElements() {
  const { View } = useLottie({ animationData, loop: true, autoplay: true });

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-full w-full">{View}</div>
    </div>
  );
}
