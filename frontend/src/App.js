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
      const response = await fetch('http://localhost:5001/api/detect-cyberbullying', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

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
    // Replace escape characters like \n with actual newlines
    const cleanedText = text.replace(/\\n/g, '\n').replace(/\\/g, '').trim();
  
    // Split the text by dashes, filter out empty or invalid items
    return cleanedText
      .split('-')
      .map((line) => line.trim()) // Trim each line
      .filter((line) => line !== '' && !line.startsWith('"')) // Remove empty or invalid lines
      .map((line, index) => <p key={index}>{`- ${line}`}</p>); // Format with a dash
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
