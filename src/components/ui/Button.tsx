import styled, { css } from 'styled-components';
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children: React.ReactNode;
};

export default function Button({
  variant = 'primary',
  loading = false,
  iconLeft,
  iconRight,
  children,
  ...props
}: ButtonProps) {
  return (
    <StyledButton $variant={variant} disabled={loading || props.disabled} {...props}>
      {iconLeft && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{iconLeft}</span>}
      {loading ? 'Chargement...' : children}
      {iconRight && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{iconRight}</span>}
    </StyledButton>
  );
}

const StyledButton = styled.button<{ $variant: string; disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  border: 1.5px solid transparent;
  transition: background 0.2s, color 0.2s, border 0.2s, opacity 0.2s;

  ${({ theme, $variant }) =>
    $variant === 'primary' &&
    css`
      background: ${theme.colors.primary};
      color: ${theme.colors.white};
      border-color: ${theme.colors.primary};
      &:hover:not(:disabled) {
        background: ${theme.colors.primaryHover};
        border-color: ${theme.colors.primaryHover};
      }
    `}
  ${({ theme, $variant }) =>
    $variant === 'secondary' &&
    css`
      background: ${theme.colors.white};
      color: ${theme.colors.primary};
      border-color: ${theme.colors.primary};
      &:hover:not(:disabled) {
        background: ${theme.colors.primaryLight};
      }
    `}
  ${({ theme, $variant }) =>
    $variant === 'danger' &&
    css`
      background: ${theme.colors.error};
      color: ${theme.colors.white};
      border-color: ${theme.colors.error};
      &:hover:not(:disabled) {
        background: #d32f2f;
        border-color: #d32f2f;
      }
    `}
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;