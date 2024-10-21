import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TextInput, PasswordInput, Select, Button, Title, Group, Text } from '@mantine/core';
import Cookies from 'js-cookie';
import { StyledContainer, StyledPaper, CriteriaList, CriteriaItem, FormGroup } from '../CSS/SignUpStyles';
export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    objective: 'mind of steel'
  });
  const [usernameExists, setUsernameExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordCriteriaMet, setPasswordCriteriaMet] = useState({});
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPasswordCriteria, setShowPasswordCriteria] = useState(false);
  const router = useRouter();

  const passwordCriteria = {
    length: { regex: /.{8,}/, message: 'At least 8 characters' },
    uppercase: { regex: /[A-Z]/, message: 'At least one uppercase letter' },
    lowercase: { regex: /[a-z]/, message: 'At least one lowercase letter' },
    number: { regex: /[0-9]/, message: 'At least one number' },
    special: { regex: /[!@#$%^&*]/, message: 'At least one special character' },
  };
  useEffect(() => {
    const storedUsername = Cookies.get('username');
    if (storedUsername) {
      router.push('/home');
    }
  }, [router]);

  useEffect(() => {
    const checkUsername = async () => {
      if (formData.username) {
        const res = await fetch(`/api/check-username?username=${formData.username}`);
        const data = await res.json();
        setUsernameExists(data.exists);
      }
    };
    checkUsername();
  }, [formData.username]);

  useEffect(() => {
    const checkEmail = async () => {
      if (formData.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(formData.email);

        if (!isValidEmail) {
          setEmailInvalid(true);
          setEmailExists(false);
          return;
        }

        const res = await fetch(`/api/check-email?email=${formData.email}`);
        const data = await res.json();
        setEmailExists(data.exists);
        setEmailInvalid(!isValidEmail || data.exists);
      }
    };

    checkEmail();
  }, [formData.email]);

  useEffect(() => {
    const criteria = {};
    for (const [key, { regex }] of Object.entries(passwordCriteria)) {
      criteria[key] = regex.test(formData.password);
    }
    setPasswordCriteriaMet(criteria);
  }, [formData.password]);

  useEffect(() => {
    setPasswordsMatch(formData.password === formData.confirmPassword);
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (usernameExists || emailExists || emailInvalid || !passwordsMatch || Object.values(passwordCriteriaMet).includes(false)) {
      alert('Please fix the errors before submitting');
      return;
    }

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      const data = await res.json();
      router.push(`/home?username=${data.username}`);
    } else {
      alert('Sign up failed');
    }
  };
  return (
    <StyledContainer>
      <StyledPaper shadow="md" radius="md">
        <Title order={2} align="center" mb="lg">Sign Up</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <TextInput
              label="Username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              error={usernameExists ? 'Username already exists' : null}
            />
          </FormGroup>
          <FormGroup>
            <TextInput
              label="Email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              error={emailInvalid ? 'Invalid email address' : emailExists ? 'Email already exists' : null}
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
              onFocus={() => setShowPasswordCriteria(true)}
              onBlur={() => setShowPasswordCriteria(false)}
            />
            {showPasswordCriteria && (
              <CriteriaList>
                {Object.entries(passwordCriteria).map(([key, { message }]) => (
                  <CriteriaItem key={key} color={passwordCriteriaMet[key] ? 'green' : 'red'}>
                    {message}
                  </CriteriaItem>
                ))}
              </CriteriaList>
            )}
          </FormGroup>
          <FormGroup>
            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              error={!passwordsMatch ? 'Passwords do not match' : null}
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
          <Group position="center">
            <Button type="submit">Sign Up</Button>
          </Group>
        </form>
      </StyledPaper>
    </StyledContainer>
  );
}