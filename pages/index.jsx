import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Container, Title, Button, Group, Text, List, ThemeIcon, rem } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { Inner, Content, StyledTitle, ControlButton, StyledImage, Highlight } from '../CSS/IndexStyles';

export function HeroBullets() {
  return (
    <Container size="md">
      <Inner>
        <Content>
          <StyledTitle>
            Welcome to <Highlight>ADay</Highlight>
          </StyledTitle>
          <Text c="dimmed" mt="md">
            ADay is a website dedicated to human well-being and development, focusing on spirituality, fitness, and mental health. It includes tasks, a personal AI assistant, and a task tracker. Created by Fabian Cretu.
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Spirituality</b> – Enhance your spiritual journey with guided tasks and resources.
            </List.Item>
            <List.Item>
              <b>Fitness</b> – Stay fit with personalized fitness plans and tracking.
            </List.Item>
            <List.Item>
              <b>Mental Health</b> – Access tools and resources to support your mental well-being.
            </List.Item>
          </List>

          <Group mt={30}>
            <ControlButton radius="xl" size="md" onClick={() => window.location.href = 'http://localhost:3000/signup'}>
              Sign Up
            </ControlButton>
            <ControlButton variant="default" radius="xl" size="md" onClick={() => window.location.href = 'http://localhost:3000/login'}>
              Login
            </ControlButton>
          </Group>
        </Content>
        <StyledImage src="/uploads/image.png" />
      </Inner>
    </Container>
  );
}
export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUsername = Cookies.get('username');
    if (storedUsername) {
      setIsAuthenticated(true);
      router.push('/home');
    }
  }, [router]);

  if (isAuthenticated) {
    return null; 
  }
  return <HeroBullets />;
}