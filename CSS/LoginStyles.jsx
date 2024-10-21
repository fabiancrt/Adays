import styled from 'styled-components';
import { Container, Paper } from '@mantine/core';

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

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;