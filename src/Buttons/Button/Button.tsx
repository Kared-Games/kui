import * as React from "react";
import { ButtonProps } from "./Button.d";
import { styleButton } from "./styleButton";
import Ripple from "../Ripple/Ripple";

/**
 * Primary UI component for user interaction
 */
export default function Button({
  type,
  primary = true,
  size = "medium",
  backgroundColor = "",
  label,
  shape = "round",
  className,
  children,
  ripple = true,
  rippleDuration = 500,
  rippleColor,
  sx = {},
  disabled = false,
  ...buttonProps
}: ButtonProps) {
  const mode = primary ? "karedButton--primary" : "karedButton--secondary";
  const buttonCustom = styleButton(
    backgroundColor,
    shape,
    primary,
    size,
    disabled
  ) as unknown as React.CSSProperties;
  const completeStyle: React.CSSProperties = { ...buttonCustom, ...sx };

  let color = "rgba(0, 0, 0, 0.2)";
  if (rippleColor) color = rippleColor;

  return (
    <button
      type={type}
      className={[
        "karedButton",
        `karedButton--${size}`,
        shape,
        mode,
        className,
        `${disabled ? "disabled" : ""}`,
      ].join(" ")}
      style={completeStyle}
      onClick={(event) => {
        if (buttonProps.onClick) {
          buttonProps.onClick(event);
        }
      }}
      {...buttonProps}
      disabled={disabled}
    >
      {label && <span className="karedButton--label">{label}</span>}
      {ripple && <Ripple duration={rippleDuration} color={color} />}
      {children}
    </button>
  );
}
