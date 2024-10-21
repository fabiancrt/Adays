import styled from 'styled-components';
import { UnstyledButton, Title, rem } from '@mantine/core';

export const Navbar = styled.nav`
  background-color: var(--mantine-color-white);
  height: 100vh; /* Ensure full height */
  width: ${rem(300)};
  display: flex;
  flex-direction: column;
  border-right: ${rem(1)} solid var(--mantine-color-gray-3);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
`;

export const Aside = styled.div`
  flex: 0 0 ${rem(60)};
  background-color: var(--mantine-color-body);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: ${rem(1)} solid var(--mantine-color-gray-3);
`;

export const Main = styled.div`
  flex: 1;
  background-color: var(--mantine-color-gray-0);
  padding: var(--mantine-spacing-md);
`;

export const MainLink = styled(UnstyledButton)`
  width: ${rem(44)};
  height: ${rem(44)};
  border-radius: var(--mantine-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--mantine-color-gray-7);
  margin-bottom: var(--mantine-spacing-md);

  &:hover {
    background-color: var(--mantine-color-gray-0);
  }

  &[data-active] {
    &,
    &:hover {
      background-color: var(--mantine-color-blue-light);
      color: var(--mantine-color-blue-light-color);
    }
  }
`;

export const TitleStyled = styled(Title)`
  font-family: Greycliff CF, var(--mantine-font-family);
  margin-bottom: var(--mantine-spacing-xl);
  background-color: var(--mantine-color-body);
  padding: var(--mantine-spacing-md);
  padding-top: ${rem(18)};
  height: ${rem(60)};
  border-bottom: ${rem(1)} solid var(--mantine-color-gray-3);
`;

export const Logo = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: ${rem(60)};
  padding-top: var(--mantine-spacing-md);
  border-bottom: ${rem(1)} solid var(--mantine-color-gray-3);
  margin-bottom: var(--mantine-spacing-xl);

  img {
    width: ${rem(30)};
    height: ${rem(30)};
    border-radius: 50%;
  }
`;

export const LinkStyled = styled.a`
  display: block;
  text-decoration: none;
  border-top-right-radius: var(--mantine-radius-md);
  border-bottom-right-radius: var(--mantine-radius-md);
  color: var(--mantine-color-gray-7);
  padding: 0 var(--mantine-spacing-md);
  font-size: ${rem(12)}; /* Adjusted font size */
  margin-right: var(--mantine-spacing-md);
  font-weight: bold;
  height: ${rem(44)};
  line-height: ${rem(44)};

  &:hover {
    background-color: var(--mantine-color-gray-1);
    color: var(--mantine-color-dark);
  }

  &[data-active] {
    &,
    &:hover {
      border-left-color: var(--mantine-color-blue-filled);
      background-color: var(--mantine-color-blue-filled);
      color: var(--mantine-color-white);
    }
  }
`;