import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import { colors, fontSize } from '@puremart/tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const base: CSSProperties = {
  fontFamily: 'inherit',
  fontWeight: 700,
  borderRadius: 10,
  border: '2px solid transparent',
  cursor: 'pointer',
};

const variants: Record<ButtonVariant, CSSProperties> = {
  primary: { background: colors.blue, color: colors.white },
  secondary: { background: colors.white, color: colors.blue, borderColor: colors.blue },
  danger: { background: colors.red, color: colors.white },
  ghost: { background: 'transparent', color: colors.ink },
};

const sizes: Record<ButtonSize, CSSProperties> = {
  sm: { fontSize: fontSize.small, padding: '8px 14px' },
  md: { fontSize: 15, padding: '12px 22px' },
};

export function Button({ variant = 'primary', size = 'md', children, style, ...rest }: ButtonProps) {
  return (
    <button style={{ ...base, ...variants[variant], ...sizes[size], ...style }} {...rest}>
      {children}
    </button>
  );
}
