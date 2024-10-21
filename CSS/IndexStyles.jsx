import styled from 'styled-components';
import { Title, Button, Image, rem } from '@mantine/core';

export const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: calc(var(--mantine-spacing-xl) * 4);
  padding-bottom: calc(var(--mantine-spacing-xl) * 4);
`;

export const Content = styled.div`
  max-width: ${rem(480)};
  margin-right: calc(var(--mantine-spacing-xl) * 3);

  @media (max-width: 768px) {
    max-width: 100%;
    margin-right: 0;
  }
`;

export const StyledTitle = styled(Title)`
  color: light-dark(var(--mantine-color-black), var(--mantine-color-white));
  font-family: Greycliff CF, var(--mantine-font-family);
  font-size: ${rem(44)};
  line-height: 1.2;
  font-weight: 900;

  @media (max-width: 576px) {
    font-size: ${rem(28)};
  }
`;

export const ControlButton = styled(Button)`
  @media (max-width: 576px) {
    flex: 1;
  }
`;

export const StyledImage = styled(Image)`
  width: ${rem(376)};
  height: ${rem(356)};

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Highlight = styled.span`
  position: relative;
  background-color: var(--mantine-color-blue-light);
  border-radius: var(--mantine-radius-sm);
  padding: ${rem(4)} ${rem(12)};
`;