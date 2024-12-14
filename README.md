# Cyberbullying Detection System

## Overview
The Cyberbullying Detection System is a web-based application designed to detect harmful language in real time. It integrates **OpenAI's API** with the **Joi validation library** to analyze user inputs and flag potential instances of cyberbullying. The system provides users with a chat interface built using **React.js**, where inputs are processed through a **Node.js backend**. The application aims to promote safer online interactions by leveraging NLP techniques and validation frameworks.

---

## Tech Stack
### Frontend
- **React.js**: For building a responsive and interactive user interface.

### Backend
- **Node.js**: To handle server-side logic and API requests.
- **Joi Validation Library**: To validate and filter user inputs in real time.
- **Redis**: For caching API responses, optimizing performance.

### OpenAI Integration
- **gpt-3.5-turbo model**: Provides advanced natural language processing capabilities to detect cyberbullying.

---

## Features
1. Real-time detection of cyberbullying using OpenAI's GPT models.
2. Intuitive web-based chat interface for user interaction.
3. Scalable backend with caching support to handle high request volumes.
4. High accuracy in identifying various types of harmful content, including direct insults and offensive sarcasm.

---

## How to Run

### Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **Redis** (for caching API responses)
- **OpenAI API Key** (Sign up for OpenAI and obtain an API key)

### Backend Setup
1. Clone the repository:
  ```sh
    git clone https://github.com/ttmtu2003/SafeSpaceAI.git
  ```
2. Navigate to the directory:
  ```sh
    cd SafeSpaceAI
  ```
3. Install dependencies:
  ```sh
    npm install
  ```
4. Create a .env file for configuration with the following:
  ```sh
    OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
    REDIS_HOST=localhost
    REDIS_PORT=6379
    CHAT_GPT_TRAINING_CONTENT_DIR=./dataFiles/gpt/
  ```
5. Start the backend server:
  ```sh
    node server.js
  ```
6. In another terminal, navigate to frontend directory:
  ```sh
    cd SafeSpaceAI/frontend
  ```
7.  Install dependencies:
  ```sh
    npm install
  ```
8. Start the frontend server:
  ```sh
    npm start
  ```

---

## Contributors
- Bianca Cervantes
- Ekansh Gupta
- Travis Lincoln
- Tu Tran

---

## Acknowledgements
- Our advisor, Andrew Bond, for his invaluable guidance throughout the project.
