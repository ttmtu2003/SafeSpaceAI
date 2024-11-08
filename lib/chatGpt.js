const OpenAI = require('openai')

require('dotenv').config()

const { OPENAI_API_KEY } = process.env

const configuration = {
  apiKey: OPENAI_API_KEY,
}


const DEFAULT_MODEL = 'gpt-3.5-turbo-0125'

const DEFAULT_CONFIG = {
  temperature: 1,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
}

  const openai = new OpenAI(configuration)
  
  const createChatCompletion = async (payload) => {
    try {
      const {
        messages,
        model = DEFAULT_MODEL,
        config = DEFAULT_CONFIG
      } = payload

      const requestBody = {
        model,
        messages,
        ...config
      }
      const result = await openai.chat.completions.create(requestBody)
      return { success: true, response: result.choices[0].message.content }
    } catch(error) {
      return { success: false, error }
    }
  }

module.exports = {
  createChatCompletion
}