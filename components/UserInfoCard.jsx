import { Avatar, Text, Group, Button, Box } from '@mantine/core';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {
  Card,
  UserDetails,
  UserObjective,
  UserName,
  UserEmail,
  Icon,
  MembershipStatus
} from './UserInfoCardStyles';

export function UserInfoCard({ objective, username, email }) {
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showBox, setShowBox] = useState(false);

  useEffect(() => {
    const fetchMembershipStatus = async () => {
      try {
        const response = await fetch('/api/userMembership');
        const data = await response.json();
        setIsMember(data.member);
      } catch (error) {
        console.error('Error fetching membership status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembershipStatus();
  }, []);

  const handleLinkClick = async () => {
    try {
      const response = await fetch('/api/updateMembershipStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setIsMember(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        console.error('Failed to update membership status');
      }
    } catch (error) {
      console.error('Error updating membership status:', error);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Card>
      {!isMember && (
        <>
          <Button
            color="blue"
            onClick={() => setShowBox(!showBox)}
          >
            Become a member
          </Button>
          {showBox && (
            <Box mt="md" p="md" style={{ border: '1px solid lightblue', borderRadius: '8px' }}>
              Click this link and visit me on <a href="https://www.linkedin.com/in/cretu-fabian/" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>LinkedIn</a> to become a member.
            </Box>
          )}
        </>
      )}
      <Avatar
        src="/uploads/profile.png"
        size={94}
        radius="md"
      />
      <UserDetails>
        <UserObjective>{objective}</UserObjective>
        <UserName>{username}</UserName>
        <UserEmail>
          <Icon stroke={1.5} size="1rem" />
          {email}
        </UserEmail>
        <MembershipStatus member={isMember}>
          {isMember ? 'Member' : 'Non-member'}
        </MembershipStatus>
      </UserDetails>
    </Card>
  );
}