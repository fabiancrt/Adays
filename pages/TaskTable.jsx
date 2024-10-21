import { useState, useEffect } from 'react';
import { Table, Checkbox, ScrollArea, Text, Progress } from '@mantine/core';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import axios from 'axios';
import { getRandomTasks } from '../utils/taskUtils'; 
import { StyledTable, MessageBox } from '../CSS/TaskTableStyles';


export default function TaskTable({ objective }) {
  const [tasks, setTasks] = useState([]);
  const [aPoints, setAPoints] = useState(0);
  const username = Cookies.get('username');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('/api/userTasks');
        if (res.data.tasks.length > 0) {
          setTasks(res.data.tasks);
        } else {
          const newTasks = getRandomTasks(objective);
          setTasks(newTasks);
          await axios.post('/api/userTasks', { tasks: newTasks });
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    if (username && objective) {
      fetchTasks();
    }
  }, [username, objective]);

  const handleCheckboxChange = async (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, progress: 100, status: 'Completed' } : task
    );
    setTasks(updatedTasks);
    await axios.post('/api/userTasks', { tasks: updatedTasks });

    const allCompleted = updatedTasks.every(task => task.status === 'Completed');
    if (allCompleted) {
      setAPoints(prevAPoints => {
        const newAPoints = prevAPoints + 10;
        localStorage.setItem(`apoints_${username}`, newAPoints);
        updateAPointsInDatabase(username, newAPoints);
        return newAPoints;
      });
    }

    await incrementTasksCompleted(username);
  };

  const incrementTasksCompleted = async (username) => {
    try {
      await axios.post('/api/increment-tasks-completed', { username });
    } catch (error) {
      console.error('Error incrementing tasks completed in the database:', error);
    }
  };

  const updateAPointsInDatabase = async (username, points) => {
    try {
      await axios.post('/api/update-points', { username, points });
    } catch (error) {
      console.error('Error updating points in the database:', error);
    }
  };

  const rows = tasks.map((task) => (
    <tr key={task.id}>
      <td>{task.task}</td>
      <td>
        <Progress value={task.progress} />
      </td>
      <td>
        <Checkbox
          checked={task.status === 'Completed'}
          onChange={() => handleCheckboxChange(task.id)}
          disabled={task.status === 'Completed'}
        />
      </td>
    </tr>
  ));

  const allCompleted = tasks.length > 0 && tasks.every(task => task.status === 'Completed');

  return (
    <>
      <ScrollArea>
        <StyledTable>
          <thead>
            <tr>
              <th>Task</th>
              <th>Progress</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </StyledTable>
      </ScrollArea>
      {allCompleted && (
        <MessageBox>
          <Text color="#9deb8f" size="12px"><strong>Congratulations! You have completed all tasks for today and earned +10 APoints!</strong></Text>
        </MessageBox>
      )}
    </>
  );
}