import * as React from 'react';
import { styleButton } from './styleButton';
import { Ripple } from '../Ripple/Ripple';

/**
 * Primary UI component for user interaction
 */

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * type of the button
   */
  type?: "button" | "submit" | "reset";
  /**
   * Button contents
   */
  label: string;
  /**
   * Button shape
   */
  shape?: "square" | "round";
  /**
   * Button classname override
   */
  className?: string;
  /**
   * Button style overrides
   */
  sx?: React.CSSProperties;
  /**
   * Usual button props: onClick
   */
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  /**
   * Optional click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: React.ReactElement;
  /**
   * If the button has a ripple effect on click.
   */
  ripple?: boolean;
  /**
   * Duration of the ripple effect
   */
  rippleDuration?: number;
   /**
   * Color of the ripple effect. Default color is the color of the button's background.
   */
   rippleColor?: string;
    /**
   * If the button is disabled.
   */
   disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  type,
  primary = true,
  size = 'medium',
  backgroundColor = null,
  label,
  shape = 'round',
  className,
  children,
  ripple = true,
  rippleDuration = 500, 
  rippleColor,
  sx = {},
  disabled = false,
  ...buttonProps
}) => {
  const mode = primary ? 'karedButton--primary' : 'karedButton--secondary';
  const buttonCustom = styleButton(backgroundColor || '', shape, primary, size, disabled) as unknown as React.CSSProperties;
  const completeStyle: React.CSSProperties = { ...buttonCustom, ...sx };
  
  let color =  backgroundColor ? backgroundColor : primary ? '#1ea7fd' : 'lightgray';
  if (rippleColor) color = rippleColor;
  
  return (
    <button
      type={type}
      className={['karedButton', `karedButton--${size}`, shape, mode, className, `${disabled ? 'disabled' : ''}`].join(' ')}
      style={completeStyle}
      onClick={(event) => {
        if (buttonProps.onClick) {
          buttonProps.onClick(event);
        }
      }}
      {...buttonProps}
      disabled={disabled}
    >
      {label && <span className='karedButton--label'>{label}</span>}
      {ripple && <Ripple duration={rippleDuration} color={color} />}
      {children}
    </button>
  );
};

export { Button };
