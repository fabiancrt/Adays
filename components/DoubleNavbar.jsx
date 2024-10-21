import { useState, useEffect } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { Tooltip, rem } from '@mantine/core';
import { IconHome2, IconUser, IconRobot } from '@tabler/icons-react';
import { UserInfoCard } from './UserInfoCard'; 
import {
  Navbar,
  Wrapper,
  Aside,
  Main,
  MainLink,
  TitleStyled,
  Logo,
  LinkStyled,
} from './DoubleNavbar.styles'; 

const mainLinksMockdata = [
  { icon: IconHome2, label: 'Home' },
  { icon: IconUser, label: 'Account' },
  { icon: IconRobot, label: 'AI' },
];

const secondaryLinksMockdata = {
  Home: [{ label: 'Go back home', href: '/home' }], 
  Account: [], 
  AI: [{ label: 'Check out your AI friend!', href: '/ai-chat' }],
};

export function DoubleNavbar() {
  const [active, setActive] = useState('Home');
  const [userObjective, setUserObjective] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = Cookies.get('username');
    if (storedUsername) {
      setUsername(storedUsername);
      fetchObjective(storedUsername);
    } else {
      window.location.href = '/login';
    }
  }, []);

  const fetchObjective = async (username) => {
    try {
      const res = await fetch(`/api/getObjective?username=${username}`);
      if (!res.ok) {
        throw new Error('Failed to fetch objective');
      }
      const data = await res.json();

    } catch (error) {
      console.error(error);
    }
  };

  if (!username) {
    return null; 
  }

  const mainLinks = mainLinksMockdata.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={link.label}
    >
      <MainLink
        onClick={() => setActive(link.label)}
        data-active={link.label === active || undefined}
      >
        <link.icon style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
      </MainLink>
    </Tooltip>
  ));

  const getSecondaryLinks = () => {
    console.log('Current user objective:', userObjective); 

    if (active === 'AI') {
      return (
        <LinkStyled href={secondaryLinksMockdata.AI[0].href} key={secondaryLinksMockdata.AI[0].label}>
          {secondaryLinksMockdata.AI[0].label}
        </LinkStyled>
      );
    } else if (active === 'Account') {
      return [
        <UserInfoCard
          key="user-info"
          objective={userObjective}
          username={username}
          email={`${username}@example.com`} 
        />,
        <LinkStyled href="/logout" key="logout">
          Sign Out
        </LinkStyled>
      ];
    } else {
      return secondaryLinksMockdata[active].map((link) => (
        <LinkStyled href={link.href} key={link.label}>
          {link.label}
        </LinkStyled>
      ));
    }
  };

  const secondaryLinks = getSecondaryLinks();

  return (
    <Navbar>
      <Wrapper>
        <Aside>
          <Logo>
            <Image src="/uploads/image.png" alt="Logo" width={30} height={30} className="logo-image" />
          </Logo>
          {mainLinks}
        </Aside>
        <Main>
          <TitleStyled order={4}>
            {active}
          </TitleStyled>
          {secondaryLinks}
        </Main>
      </Wrapper>
    </Navbar>
  );
}