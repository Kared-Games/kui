import React, { useState, MouseEvent, useEffect } from "react";
import "./ripple.css";

interface RippleProps {
  duration: number;
  color: string;
  animationType?: "circle" | "square" | "fade" | "expand" | "wave";
  className?: string;
  sx?: React.CSSProperties;
}

/**
 * Ripple effect component
 * @param {number} duration - Duration of the ripple effect in milliseconds
 * @param {string} color - Color of the ripple effect
 * @param {string} animationType - Type of animation (circle, square, fade, expand, wave)
 * @param {string} className - Additional class name for styling
 * @param {React.CSSProperties} sx - Additional styles for the ripple container
 */
export default function Ripple({
  duration,
  color,
  animationType = "circle",
  className,
  sx,
}: RippleProps) {
  const [rippleArray, setRippleArray] = useState<
    Array<{ top: number; left: number; size: number }>
  >([]);

  useEffect(() => {
    if (rippleArray.length > 0) {
      const timer = setTimeout(() => {
        setRippleArray([]);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [rippleArray, duration]);

  const addRipple = (event: MouseEvent<HTMLDivElement>) => {
    const rippleContainer = event.currentTarget.getBoundingClientRect();
    const size =
      rippleContainer.width > rippleContainer.height
        ? rippleContainer.width
        : rippleContainer.height;
    const x = event.clientX - rippleContainer.left - size / 2;
    const y = event.clientY - rippleContainer.top - size / 2;
    const newRipple = {
      top: y,
      left: x,
      size: size,
    };
    setRippleArray([...rippleArray, newRipple]);
  };

  return (
    <div className="ripple-container" onMouseDown={addRipple} style={{ ...sx }}>
      {rippleArray.map((ripple, index) => (
        <span
          key={index}
          style={{
            top: ripple.top,
            left: ripple.left,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: color,
            animationDuration: `${duration}ms`,
            zIndex: 9999,
          }}
          className={`ripple ripple-${animationType}${
            className ? ` ${className}` : ""
          }`}
        />
      ))}
    </div>
  );
}
