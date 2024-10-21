import styled from 'styled-components';
import { Container, Paper, Text } from '@mantine/core';

export const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

export const StyledPaper = styled(Paper)`
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const CriteriaList = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

export const CriteriaItem = styled(Text)`
  font-size: 0.875rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;