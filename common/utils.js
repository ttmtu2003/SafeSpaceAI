
const fs = require('fs')
const CHAT_GPT_MESSAGE_ROLES = require('./chatGPTMessageRoles')
require('dotenv').config()
const stringSimilarity = require('string-similarity');

const {
  CHAT_GPT_TRAINING_CONTENT_DIR,
} = process.env

const redis = require('redis')

/**
 * Get chat GPT training contents from files
 */
const getChatGPTTrainingContent = () => {
  // key: skill name
  // value: training content
  const trainingContentBySkill = {}

  // get list of training content file names by reading directory
  // each file names is a skill name
  const trainingContentFileNames = fs.readdirSync(CHAT_GPT_TRAINING_CONTENT_DIR)

  // read all training content from files then set `trainingContentBySkill`
  trainingContentFileNames.forEach((curFileName) => {
    const curContent = fs.readFileSync(
      CHAT_GPT_TRAINING_CONTENT_DIR + curFileName,
      { encoding: 'utf8' },
    )
    trainingContentBySkill[curFileName.replace('.txt', '')] = curContent
  })

  return trainingContentBySkill
}


const getChatGPTTrainingContentMessageByIntent = (intentName) => {
  const DETECT_INTENT_NAME = 'detectCyberbullying'

  const trainingContents = getChatGPTTrainingContent()

  // default message ALWAYS contains `detect intent training content` at first
  let trainingContentMessage = trainingContents[DETECT_INTENT_NAME]

  // add training content by provided intent name
  if (intentName && trainingContents[intentName]) {
    trainingContentMessage += '\n'
    trainingContentMessage += trainingContents[intentName]
  }

  // default message ALWAYS contains `important note for training content` by the end
  // trainingContentMessage += trainingContents[IMPORTANT_NOTE_NAME]

  return {
    role: CHAT_GPT_MESSAGE_ROLES.SYSTEM,
    content: trainingContentMessage,
  }
}

// Create a Redis client
const redisClient = redis.createClient({
    socket: {
        host: '127.0.0.1',
        port: 6379,
    },
})

redisClient.connect()
    .then(() => console.log('Connected to Redis'))
    .catch(err => console.error('Redis connection error:', err))

// Helper to get cached data
async function getCachedResponseFuzzy(message) {
  try {
    // Get all keys from Redis
    const keys = await redisClient.keys('cyberbullying:*');

    if (keys.length === 0) return null;

    // Extract the messages from keys
    const cachedMessages = keys.map(key => key.replace('cyberbullying:', ''));

    // Compare the input message with cached messages
    const { bestMatch } = stringSimilarity.findBestMatch(message, cachedMessages);

    // Check if the best match is at least 95% similar
    if (bestMatch.rating >= 0.95) {
      const cacheKey = `cyberbullying:${bestMatch.target}`;
      const cachedResponse = await redisClient.get(cacheKey);
      console.log(`Fuzzy match found: ${bestMatch.target} with similarity ${bestMatch.rating}`);
      return JSON.parse(cachedResponse);
    }

    return null;
  } catch (error) {
    console.error('Error fetching from Redis with fuzzy matching:', error);
    return null;
  }
}


// Helper to set cache
async function setCache(key, value, ttl = 3600) { // Default TTL: 1 hour
    try {
        await redisClient.set(key, JSON.stringify(value), 'EX', ttl)
    } catch (error) {
        console.error('Error setting cache in Redis:', error)
    }
}

module.exports = {
  getChatGPTTrainingContentMessageByIntent,
  redisClient,
  getCachedResponseFuzzy,
  setCache,
}