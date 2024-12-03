const OpenAI = require('openai')
const { getCachedResponse, setCache } = require('../common/utils')
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

    // Use the user's latest message as the cache key
    let userMessage = 'unknown'
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'user') {
        userMessage = messages[i].content
        break
      }
    }

    const cacheKey = `cyberbullying:${userMessage}`

    // Check cache for the response
    const cachedResponse = await getCachedResponse(cacheKey)
    if (cachedResponse) {
      return { success: true, response: cachedResponse }
    }

    console.log('Cache miss for message:', userMessage)

    const requestBody = {
      model,
      messages,
      ...config,
    }

    const result = await openai.chat.completions.create(requestBody)

    // Save response to cache
    await setCache(cacheKey, result.choices[0].message.content)

    return { success: true, response: result.choices[0].message.content }
  } catch (error) {
    return { success: false, error }
  }
}

module.exports = {
  createChatCompletion
}