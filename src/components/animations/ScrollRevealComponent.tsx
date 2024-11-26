/** @format */
import React, { FC, useEffect } from "react";
import ScrollReveal from "scrollreveal";

interface Props {
  children: React.ReactNode;
  duration?: number;
  distance?: string;
  easing?: "ease-in-out" | "ease-in" | "ease-out" | "linear" | "cubic-bezier";
  origin?: "top" | "bottom" | "left" | "right";
  reset?: boolean;
  className?: string;
  selectorClass: string;
  viewFactor?: number;
  viewOffset?: { left: number; top: number };
  delay?: number;
  interval?: number;
  scale?: number;
  rotate?: { x: number; y: number; z: number };
}

const ScrollRevealComponent: FC<Props> = ({
  children,
  easing,
  origin,
  duration = 1000,
  distance = "100%",
  reset = false,
  className,
  selectorClass,
  viewFactor = 0.5,
  viewOffset = { left: 0, top: 0 },
  delay = 0,
  interval = 0,
  scale = 1,
  rotate = { x: 0, y: 0, z: 0 },
}) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Pastikan hanya dijalankan di client-side
      ScrollReveal().reveal(`.${selectorClass}`, {
        duration: duration,
        distance: distance,
        easing: easing || "ease-in-out",
        origin: origin || "bottom",
        reset: reset, // Set to true if you want the animation to repeat on every scroll
        viewFactor: viewFactor,
        viewOffset: viewOffset,
        delay: delay,
        interval: interval,
        scale: scale,
        rotate: rotate,
      });
    }
  }, [
    delay,
    distance,
    duration,
    easing,
    interval,
    origin,
    reset,
    rotate,
    scale,
    selectorClass,
    viewFactor,
    viewOffset,
  ]);

  return <div className={`${selectorClass} ${className}`}>{children}</div>;
};

export default ScrollRevealComponent;
