import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import TaskTable from './TaskTable'; 
import CarouselCard from './CarouselCard'; 
import StatsRingCard from './StatsRingCard'; 
import ChatGPTBox from './ChatGPTBox'; 
import styled from 'styled-components';
import { useRouter } from 'next/router';

export default function Home() {
  const [username, setUsername] = useState('');
  const [objective, setObjective] = useState(''); 
  const router = useRouter();

  useEffect(() => {
    const storedUsername = Cookies.get('username');
    if (storedUsername) {
      setUsername(storedUsername);
      fetchObjective(storedUsername);
    } else {
      router.push('/login');
    }
  }, [router]);

  const fetchObjective = async (username) => {
    try {
      const res = await fetch(`/api/getObjective?username=${username}`);
      if (!res.ok) {
        const errorData = await res.json();
        console.error('Failed to fetch objective:', errorData.error);
        return;
      }
      const data = await res.json();
      setObjective(data.objective);
    } catch (error) {
      console.error('Failed to fetch objective:', error);
    }
  };

  if (!username) {
    return null; 
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
      <div style={{ width: '80%', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px' }}>
        <h1 style={{ fontSize: '2em', fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
          Welcome, {username}
        </h1>
        <div style={{ display: 'flex', marginTop: '20px' }}>
          <div style={{ flex: 1, marginRight: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
              <TaskTable objective={objective}/>
            </div>
            <div>
              <ChatGPTBox username={username} objective={objective} />
            </div>
          </div>
          <div style={{ flex: 1, marginLeft: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
              <CarouselCard objective={objective} />
            </div>
            <div>
              <StatsRingCard username={username} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}