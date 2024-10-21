
import styled from 'styled-components';
import { Table } from '@mantine/core';

export const StyledTable = styled(Table)`
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
  background: #fff;
  width: 100%;
  max-width: 500px; 
  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  tr:hover {
    background-color: #f5f5f5;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
`;

export const MessageBox = styled.div`
  margin: 5px 20px;
  padding: 10px;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 500px;
  height: auto;
  font-size: 12px;
`;