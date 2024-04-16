import OpenAI from 'openai'

require('dotenv').config()

const { OPENAI_API_KEY } = process.env

const configuration = {
  apiKey: OPENAI_API_KEY,
}


const DEFAULT_MODEL = 'gpt-3.5-turbo-0125'

const DEFAULT_CONFIG = {
  temperature: 0.9,
  max_tokens: 100,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0.6,
}

// class ChatGpt {
  // constructor(config) {
  //   super(config)

    const openai = new OpenAI(configuration)
  // }

  export const createChatCompletion = async (payload, done) => {
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
      done({ success: true, response: result.choices[0].message.content })
    } catch(error) {
      done({ success: false, error })
    }
  }
// }

// export default ChatGpt