import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TextInput, PasswordInput, Select, Button, Title, Group, Text } from '@mantine/core';
import Cookies from 'js-cookie';
import { StyledContainer, StyledPaper, FormGroup } from '../CSS/LoginStyles';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    objective: 'mind of steel'
  });
  const [error, setError] = useState('');
  const router = useRouter();
  useEffect(() => {
    const storedUsername = Cookies.get('username');
    if (storedUsername) {
      router.push('/home');
    }
  }, [router]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      const data = await res.json();
      Cookies.set('username', data.username, { expires: 7 });
      router.push('/home');
    } else {
      const errorData = await res.json();
      setError(errorData.error);
    }
  };
  return (
    <StyledContainer>
      <StyledPaper shadow="md" radius="md">
        <Title order={2} align="center" mb="lg">Login</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <TextInput
              label="Username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <PasswordInput
              label="Password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Select
              label="Objective"
              name="objective"
              value={formData.objective}
              onChange={(value) => setFormData({ ...formData, objective: value })}
              data={[
                { value: 'mind of steel', label: 'Mind of Steel' },
                { value: 'physical triumph', label: 'Physical Triumph' },
                { value: 'spirit elevation', label: 'Spirit Elevation' },
              ]}
              required
            />
          </FormGroup>
          {error && <Text color="red">{error}</Text>}
          <Group position="center">
            <Button type="submit">Login</Button>
          </Group>
        </form>
      </StyledPaper>
    </StyledContainer>
  );
}