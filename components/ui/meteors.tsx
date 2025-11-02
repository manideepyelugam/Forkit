"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MeteorsProps {
  number?: number;
  className?: string;
}

export const Meteors = ({ number = 20, className }: MeteorsProps) => {
  const [styles, setStyles] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    setStyles(
      [...new Array(number)].map(() => ({
        "--angle": `${-215}deg`,
        "--duration": `${Math.random() * 6 + 4}s`,
        top: "-10%",
        left: `${Math.random() * window.innerWidth}px`,
      })) as React.CSSProperties[]
    );
  }, [number]);

  return (
    <>
      {styles.map((style, idx) => (
        <span
          key={idx}
          style={style}
          className={cn(
            "animate-meteor absolute pointer-events-none h-[2px] w-[2px] rotate-[var(--angle)] rounded-full bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]",
            className
          )}
        />
      ))}
    </>
  );
};
