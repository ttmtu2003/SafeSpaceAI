const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors') // Add this line
const { JoiWithCyberbullying } = require('./lib') // Update with actual path

const app = express();
const PORT = process.env.PORT || 5001

app.use(cors()); // Add this line to enable CORS for all routes
app.use(bodyParser.json())

// API endpoint for detecting cyberbullying
app.post('/api/detect-cyberbullying', async (req, res) => {
  const { message } = req.body
  const schema = JoiWithCyberbullying.string().cyberbullying()

  try {
    const result = await schema.validateAsync(message)
    res.json({ response: result })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
