import styled, { css } from 'styled-components';
import React from 'react';

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'danger' | 'neutral';
    size?: number;
};

export default function IconButton({
    variant = 'primary',
    size,
    children,
    ...props
}: IconButtonProps) {
    return (
        <StyledIconButton
            type="button"
            variant={variant}
            size={size}
            {...props}
        >
            {children}
        </StyledIconButton>
    );
}


const StyledIconButton = styled.button<IconButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 6px;
  width: ${({ size }) => size || 36}px;
  height: ${({ size }) => size || 36}px;
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  transition: background 0.2s;

  ${({ variant = 'primary', theme }) =>
        variant === 'danger' &&
        css`
      color: ${theme.colors.error};
      &:hover {
        background: rgba(211, 47, 47, 0.1);
      }
    `}

  ${({ variant = 'primary', theme }) =>
        variant === 'primary' &&
        css`
      color: ${theme.colors.primary};
      &:hover {
        background: ${theme.colors.primaryLight};
      }
    `}

  ${({ variant = 'neutral' }) =>
        variant === 'neutral' &&
        css`
      color: #666;
      &:hover {
        background: #eee;
      }
    `}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;