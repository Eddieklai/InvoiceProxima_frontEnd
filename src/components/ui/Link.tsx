import { Link as RouterLink } from 'react-router-dom';
import type { LinkProps as RouterLinkProps } from 'react-router-dom';
import styled from 'styled-components';
import React from 'react';

type AppLinkProps = RouterLinkProps & {
  $variant?: 'primary' | 'secondary';
  $disabled?: boolean;
  children: React.ReactNode;
  className?: string;
};

export default function Link({
  to,
  $variant = 'primary',
  $disabled = false,
  children,
  className,
  ...props
}: AppLinkProps) {
  return (
    <StyledLink
      as={RouterLink}
      to={to}
      $variant={$variant}
      $disabled={$disabled}
      className={className}
      tabIndex={$disabled ? -1 : 0}
      aria-disabled={$disabled}
      {...props}
    >
      {children}
    </StyledLink>
  );
}

const StyledLink = styled.a<{ $variant: string; $disabled?: boolean }>`
  color: ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.colors.primary : theme.colors.text};
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};

  &:hover, &:focus {
    color: ${({ theme, $variant }) =>
      $variant === 'primary' ? theme.colors.primaryHover : theme.colors.primary};
    text-decoration: underline;
    outline: none;
  }
`;