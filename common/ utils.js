import fs from 'fs'
import CHAT_GPT_MESSAGE_ROLES from './chatGPTMessageRoles'
require('dotenv').config()

const {
  CHAT_GPT_TRAINING_CONTENT_DIR,
} = process.env

/**
 * Get chat GPT training contents from files
 */
export const getChatGPTTrainingContent = () => {
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


export const getChatGPTTrainingContentMessageByIntent = (intentName) => {
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