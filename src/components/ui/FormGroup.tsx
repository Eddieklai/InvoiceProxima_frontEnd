import styled from 'styled-components';

export default function FormGroup({ label, htmlFor, children, error }: {
    label?: string;
    htmlFor?: string;
    children: React.ReactNode;
    error?: string | null;
}) {
    return (
        <Wrapper>
            {label && <Label htmlFor={htmlFor}>{label}</Label>}
            {children}
            {error && <Error>{error}</Error>}
        </Wrapper>
    )

}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 4px;
`;

const Error = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;