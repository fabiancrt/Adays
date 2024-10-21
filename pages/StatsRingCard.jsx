import { useEffect, useState, useCallback } from 'react';
import { Text, RingProgress, Group, useMantineTheme } from '@mantine/core';
import axios from 'axios';
import { CardStyled, LabelStyled, LeadStyled, InnerStyled, RingStyled } from '../CSS/StatsRingCardStyles';
import debounce from 'lodash.debounce';

const TOTAL_MONTHLY_TASKS = 300;

export default function StatsRingCard({ username }) {
  const theme = useMantineTheme();
  const [totalTasksCompleted, setTotalTasksCompleted] = useState(0);
  const [tasksCompletedThisMonth, setTasksCompletedThisMonth] = useState(0);
  const [apointsAwarded, setAPointsAwarded] = useState(false);
  const [aPoints, setAPoints] = useState(0);

  useEffect(() => {
    if (username) {
      fetchUserTasksDebounced(username);
      const cleanupWebSocket = setupWebSocket(username);
      return cleanupWebSocket;
    }
  }, [username]);

  const fetchUserTasks = async (username) => {
    try {
      const response = await axios.get('/api/userTasks', { params: { username } });
      const { totalTasksCompleted, tasksCompletedThisMonth, aPoints, tasks } = response.data;
  
      setTotalTasksCompleted(totalTasksCompleted || 0);
      setTasksCompletedThisMonth(tasksCompletedThisMonth || 0);
      setAPoints(aPoints || 0);
  
      if (tasksCompletedThisMonth >= TOTAL_MONTHLY_TASKS && !apointsAwarded) {
        await awardAPoints(username);
        setAPointsAwarded(true);
      }
    } catch (error) {
      console.error('Failed to fetch user tasks:', error);
    }
  };

  const fetchUserTasksDebounced = useCallback(debounce(fetchUserTasks, 1000), []);

  const awardAPoints = async (username) => {
    try {
      const response = await axios.get('/api/get-apoints', { params: { username } });
      const currentAPoints = response.data.apoints;
      const newAPoints = currentAPoints + 100;
      await axios.post('/api/update-points', { username, points: newAPoints });
      setAPoints(newAPoints);
    } catch (error) {
      console.error('Error awarding APoints:', error);
    }
  };

  const setupWebSocket = (username) => {
    const socket = new WebSocket(`ws://localhost:3001/ws?username=${username}`);

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'TASK_UPDATE') {
        fetchUserTasksDebounced(username);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
    };
  };

  const remainingTasks = TOTAL_MONTHLY_TASKS - tasksCompletedThisMonth;
  const completedPercentage = TOTAL_MONTHLY_TASKS > 0 ? (tasksCompletedThisMonth / TOTAL_MONTHLY_TASKS) * 100 : 0;

  const stats = [
    { value: remainingTasks, label: 'Remaining' },
    { value: tasksCompletedThisMonth, label: 'In progress' },
  ];

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <LabelStyled>{stat.value}</LabelStyled>
      <Text size="xs" color="dimmed">
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <CardStyled withBorder p="xl" radius="md">
      <InnerStyled>
        <div>
          <Text fz="xl" className="label">
            Project tasks
          </Text>
          <div>
            <LeadStyled mt={30}>{totalTasksCompleted}</LeadStyled>
            <Text fz="xs" color="dimmed">
              Completed
            </Text>
          </div>
          <Group mt="lg">{items}</Group>
        </div>

        <RingStyled>
          <RingProgress
            roundCaps
            thickness={6}
            size={150}
            sections={[{ value: completedPercentage, color: tasksCompletedThisMonth >= TOTAL_MONTHLY_TASKS ? 'green' : theme.primaryColor }]}
            label={
              tasksCompletedThisMonth >= TOTAL_MONTHLY_TASKS ? (
                <div>
                  <Text ta="center" fz="lg" color="green" className="label">
                    +100 APoints
                  </Text>
                </div>
              ) : (
                <div>
                  <Text ta="center" fz="lg" className="label">
                    {completedPercentage.toFixed(0)}%
                  </Text>
                  <Text ta="center" fz="xs" color="dimmed">
                    Completed
                  </Text>
                </div>
              )
            }
          />
        </RingStyled>
      </InnerStyled>
    </CardStyled>
  );
}