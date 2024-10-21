import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Cookies from 'js-cookie';
import {
  Box,
  BlurOverlay,
  LockIcon,
  UpgradeText,
  PlaceholderContent,
  ChatContainer,
  AccountSettingsBox,
  CenteredContainer
} from '../CSS/ChatGPTBoxStyles';

const ChatGPTBox = ({ username, objective }) => {
  const [isMember, setIsMember] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [chatbotName, setChatbotName] = useState('ADay AI'); 

  const getChatbotName = (objective) => {
    switch (objective) {
      case 'mind of steel':
        return 'Mind Master AI';
      case 'spirit elevation':
        return 'Spirit Guru AI';
      case 'physical triumph':
        return 'Titan AI';
      default:
        return 'ADay AI';
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

    fetchMembershipStatus();
  }, [username]);

  useEffect(() => {
    if (objective) {
      const assistantName = getChatbotName(objective);
      setChatbotName(assistantName); 
      setChatMessages([
        { role: 'assistant', content: `Hello! I am ${assistantName}. How can I assist you today? Feel free to ask me anything.` }
      ]);
    }
  }, [objective]);

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
          <h2>{chatbotName}</h2> 
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
            <h2>{chatbotName}</h2> 
            <p>This is a placeholder for the ChatGPT model content.</p>
          </PlaceholderContent>
          <UpgradeText>Upgrade your Account to access</UpgradeText>
          <AccountSettingsBox>
            Go to Account Settings
          </AccountSettingsBox>
        </CenteredContainer>
      )}
    </Box>
  );
};

export default ChatGPTBox;