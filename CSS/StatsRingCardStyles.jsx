import styled from 'styled-components';
import { Card, Text } from '@mantine/core';
import { rem } from '@mantine/core';

export const CardStyled = styled(Card)`
  background-color: var(--mantine-color-body);
`;

export const LabelStyled = styled(Text)`
  font-family: Greycliff CF, var(--mantine-font-family);
  font-weight: 700;
  line-height: 1;
`;

export const LeadStyled = styled(Text)`
  font-family: Greycliff CF, var(--mantine-font-family);
  font-weight: 700;
  font-size: ${rem(22)}; 
  line-height: 1;
`;

export const InnerStyled = styled.div`
  display: flex;

  @media (max-width: var(--mantine-breakpoint-xs)) {
    flex-direction: column;
  }
`;

export const RingStyled = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;

  @media (max-width: var(--mantine-breakpoint-xs)) {
    justify-content: center;
    margin-top: var(--mantine-spacing-md);
  }
`;