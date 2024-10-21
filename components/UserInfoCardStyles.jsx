import styled from 'styled-components';
import { Text } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';

export const Card = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const UserDetails = styled.div`
  margin-left: 16px;
  text-align: center;
`;

export const UserObjective = styled(Text)`
  text-transform: uppercase;
  font-weight: 700;
  color: var(--mantine-color-dimmed);
`;

export const UserName = styled(Text)`
  font-size: 1.125rem;
  font-weight: 700;
  font-family: Greycliff CF, var(--mantine-font-family);
  text-transform: uppercase;
`;

export const UserEmail = styled(Text)`
  display: flex;
  align-items: center;
  color: var(--mantine-color-dimmed);
  font-size: 0.875rem;
  margin-top: 8px;
`;

export const Icon = styled(IconAt)`
  color: var(--mantine-color-gray-5);
  margin-right: 8px;
`;

export const MembershipStatus = styled(Text)`
  margin-top: 8px;
  font-weight: 700;
  color: ${props => (props.member ? 'green' : 'red')};
`;