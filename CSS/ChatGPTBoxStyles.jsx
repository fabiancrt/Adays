import styled from 'styled-components';
import { IconLock } from '@tabler/icons-react';

export const Box = styled.div`
  margin: 20px;
  padding: 20px;
  border-radius: 15px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
`;

export const BlurOverlay = styled.div`
  ${(props) => props.locked && `
    filter: blur(5px);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    z-index: 1;
  `}
`;

export const LockIcon = styled(IconLock)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

export const UpgradeText = styled.p`
  position: relative;
  z-index: 2;
  margin-top: 20px;
`;

export const PlaceholderContent = styled.div`
  position: relative;
  z-index: 0;
  opacity: 0.5;
`;

export const ChatContainer = styled.div`
  height: 400px;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const AccountSettingsBox = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #f9f9f9;
  text-align: center;
`;

export const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;