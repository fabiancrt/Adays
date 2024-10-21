import styled from 'styled-components';

export const CarouselContainer = styled.div`
  display: flex;
  overflow: hidden;
  width: 80%;
  height: 400px;
  position: relative;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  margin: 0 auto;
`;

export const Slide = styled.div`
  min-width: 100%;
  height: 100%;
  transition: transform 0.5s ease-in-out;
  border-radius: 15px;
  background-size: cover;
  background-position: center;
  position: relative;
`;

export const ContentBox = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  background-color: rgba(255, 255, 255, 0.55);
  padding: 20px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 80%;
`;

export const Title = styled.h2`
  margin: 0;
  color: #333;
`;

export const Content = styled.p`
  margin: 10px 0 0;
  color: #555;
`;

export const Button = styled.a`
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 1;
  border-radius: 50%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

export const PrevButton = styled(NavButton)`
  left: 10px;
`;

export const NextButton = styled(NavButton)`
  right: 10px;
`;