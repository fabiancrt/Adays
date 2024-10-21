import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Cookies from 'js-cookie';
import { Box, BlurOverlay, LockIcon, UpgradeText, PlaceholderContent, ChatContainer, CenteredContainer } from '../CSS/AIChatStyles';

const AIChatPage = () => {
  const router = useRouter();
  const [isMember, setIsMember] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [username, setUsername] = useState('');
  const [objective, setObjective] = useState('');
  const [chatbotName, setChatbotName] = useState('ADay AI');

  const getChatbotName = (objective) => {
    switch (objective) {
      case 'mind of steel':
        return 'Mind Master';
      case 'spirit elevation':
        return 'Spirit Guru';
      case 'physical triumph':
        return 'Titan';
      default:
        return 'ADay AI';
    }
  };

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
        const errorData = await res.json();
        console.error('Failed to fetch objective:', errorData.error);
        return;
      }
      const data = await res.json();
      setObjective(data.objective);
      const assistantName = getChatbotName(data.objective);
      setChatbotName(assistantName);
      setChatMessages([
        { role: 'assistant', content: `Hello! I am ${assistantName}. How can I assist you today? Feel free to ask me anything.` }
      ]);
    } catch (error) {
      console.error('Failed to fetch objective:', error);
    }
  };

  useEffect(() => {
    const fetchMembershipStatus = async () => {
      try {
        const response = await axios.get('/api/userMembership', { params: { username } });
        setIsMember(response.data.member);
      } catch (error) {
        console.error('Failed to fetch membership status:', error);
      }
    };

    if (username) {
      fetchMembershipStatus();
    }
  }, [username]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = { role: 'user', content: inputMessage };
    const updatedMessages = [...chatMessages, newMessage];
    setChatMessages(updatedMessages);
    setInputMessage('');

    try {
      const response = await axios.post('/api/chat', { messages: updatedMessages });
      const assistantMessage = response.data.message;
      setChatMessages([...updatedMessages, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Box>
      {!isMember && <BlurOverlay locked />}
      {!isMember && <LockIcon size={48} />}
      {isMember ? (
        <div>
          <h2>{chatbotName} AI</h2>
          <ChatContainer>
            {chatMessages.map((msg, index) => (
              <p key={index}>
                <strong>{msg.role}:</strong> 
                {msg.role === 'assistant' ? (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                ) : (
                  msg.content
                )}
              </p>
            ))}
          </ChatContainer>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      ) : (
        <CenteredContainer>
          <PlaceholderContent>
            <h2>{chatbotName} AI</h2>
            <p>This is a placeholder for the ChatGPT model content.</p>
          </PlaceholderContent>
          <UpgradeText>Upgrade your Account to access</UpgradeText>
          <div>
            Go to Account Settings
          </div>
        </CenteredContainer>
      )}
    </Box>
  );
};

export default AIChatPage;