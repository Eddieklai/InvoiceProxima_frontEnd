import styled from 'styled-components';
import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
};

export default function Input({
    label,
    error,
    iconLeft,
    iconRight,
    id,
    ...props
}: InputProps) {
    const hasIconLeft = !!iconLeft;
    const hasIconRight = !!iconRight;
    return (
        <Wrapper>
            {label && <Label htmlFor={id}>{label}</Label>}
            <InputWrapper $hasIconLeft={!!iconLeft} $hasIconRight={!!iconRight} $hasError={!!error}>
                {iconLeft && <IconLeft>{iconLeft}</IconLeft>}
                <StyledInput
                    id={id}
                    $hasIconLeft={hasIconLeft}
                    $hasIconRight={hasIconRight}
                    {...props}
                />
                {iconRight && <IconRight>{iconRight}</IconRight>}
            </InputWrapper>
            {error && <ErrorMsg>{error}</ErrorMsg>}
        </Wrapper>
    );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 18px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2px;
`;

const InputWrapper = styled.div<{
    $hasIconLeft?: boolean;
    $hasIconRight?: boolean;
    $hasError?: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme, $hasError }) =>
        $hasError ? theme.colors.error : theme.colors.mediumGray};
  border-radius: 8px;
  transition: border 0.2s;
  &:focus-within {
    border-color: ${({ theme, $hasError }) =>
        $hasError ? theme.colors.error : theme.colors.primary};
  }
`;

const StyledInput = styled.input<{ $hasIconLeft?: boolean; $hasIconRight?: boolean }>`
  flex: 1;
  padding: 12px 16px;
  font-size: 15px;
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  ${({ $hasIconLeft }) => $hasIconLeft && 'padding-left: 40px;'}
  ${({ $hasIconRight }) => $hasIconRight && 'padding-right: 40px;'}
`;

const IconLeft = styled.span`
  position: absolute;
  left: 12px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const IconRight = styled.span`
  position: absolute;
  right: 8px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const ErrorMsg = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 13px;
  margin-top: 2px;
`;
