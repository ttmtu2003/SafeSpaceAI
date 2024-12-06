import React, { useState } from 'react';
import './App.css';
import botAvatar from './bot-avatar.png'

function App() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]); // To store the conversation
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return; // Ignore empty messages

    // Add the user's message to the chat history
    const newChatHistory = [
      ...chatHistory,
      { role: 'user', content: message },
    ];
    setChatHistory(newChatHistory);
    setMessage('');
    setIsLoading(true);

    try {
      console.log('Sending request with message:', message);
      const response = await fetch('http://localhost:5001/api/detect-cyberbullying', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      
      const data = await response.json();
      console.log("Data: " , data);

      // Add the system's response to the chat history
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: 'bot', content: data.response },
      ]);
    } catch (error) {
      // Add error message to the chat history
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: 'bot', content: 'Error detecting cyberbullying.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatResponse = (text) => {
    if (typeof text !== 'string') {
      console.warn('Invalid or missing text in formatResponse:', text);
      return <p>No content available.</p>; // Provide a fallback message
    }
  
    return text
      .split('-')
      .filter((line) => line.trim() !== '') // Remove empty lines caused by splitting
      .map((line, index) => <p key={index}>{`- ${line.trim()}`}</p>);
  };
  
  return (
    <div className="App">
      <h1>SafeSpaceAI</h1>
      <div className="chat-container">
        <div className='message-container'>
          <img src={botAvatar} alt="Bot Avatar" className="bot-avatar" />
          <div className='chat-message system-message'>
            <p>Welcome to SafeSpaceAI. I will be your assistant in helping you detect any cyberbullying content in text input! Send me anything you think is potentially harmful and I can help you check and assess.</p>
          </div>
        </div>
        {chatHistory.map((chat, index) => (
          <div
          key={index}
          className='message-container'
          >
            {chat.role === 'bot' && (
              <img src={botAvatar} alt="Bot Avatar" className="bot-avatar" />
            )}
            <div className={`chat-message ${chat.role === 'user' ? 'user-message' : 'system-message'}`}>
              {chat.role === 'bot'
                ? formatResponse(chat.content)
                : <p>{chat.content}</p>}
            </div>
          </div>
        ))}
      </div>
      <form className="input-form" onSubmit={handleSubmit}>
        <div class="embed-submit-field">
          <textarea 
            value={message} 
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
            rows="2"
            ></textarea>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Checking...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
