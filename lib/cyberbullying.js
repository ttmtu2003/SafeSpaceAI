const { getChatGPTTrainingContentMessageByIntent } = require("../common/ utils")
const { default: CHAT_GPT_MESSAGE_ROLES } = require("../common/chatGPTMessageRoles")
const { createChatCompletion } = require("./chatGpt")

const validateCyberbullyingUsingGPT = async ({ user, sender, text }) => {
  // define chat GPT model to user
  const chatGPTModel = 'gpt-3.5-turbo-0125'

  // 1. construct messages to send to chat GPT with training contents, conversation messages and defined functions for function calling
  const chatGPTCallMessages = []
  const currentConversation = []

  // 1.1 add training content messages by user's current intent
  chatGPTCallMessages.push(
    getChatGPTTrainingContentMessageByIntent(),
  )

  // [TODO] retrieve cached convo and add to chatGPTCallMessages
  if(currentConversation.length > 0) {

  } else {
    chatGPTCallMessages.push(...currentConversation)
  }

  // 1.2 add user message
  const userMessage = { text, receiver: user, sender }
  
  chatGPTCallMessages.push({
    role: CHAT_GPT_MESSAGE_ROLES.USER,
    content: userMessage
  })

  // cache the user message to currentConversations
  currentConversation.push({
    role: CHAT_GPT_MESSAGE_ROLES.USER,
    content: userMessage
  })

  console.log({ userMessage })

  // 1.3 call function
  const { response: chatGPTResponseMessage } = await createChatCompletion({ 
    messages: chatGPTCallMessages,
    model: chatGPTModel
  })

  console.log({ botMessage: chatGPTResponseMessage })

  return chatGPTResponseMessage
}



// const validateCyberbullying = async (text, user, sender, helpers) => {
//   const isCyberbullying = await createResponseUsingChatGPT({ user, sender, text });
//   if (isCyberbullying) {
//       return helpers.error('any.custom', { message: 'Content contains cyberbullying.' });
//   }
//   return text;
// }

module.exports = {
  validateCyberbullyingUsingGPT
}