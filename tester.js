const { JoiWithCyberbullying } = require("./lib")

const testValidation = async () => {
  // Define a sample input string to test
  const userInput = JSON.stringify({
    text: "Give me some restaurant suggestions in SF",
    user: {
      gender: "female",
      followerCount: 1000,
    },
    sender: {
      gender: "male",
      followerCount: 1300,
    }
  })

  try {
    // Validate the sample input string using the extended Joi object
    const validationResult = await JoiWithCyberbullying.string().cyberbullying().validate(userInput)

    // Check if there is an error
    if (validationResult.error) {
      console.error("Validation failed:", validationResult.error)
    } else {
      // Access the resolved value of the validation result
      const botMessage = await validationResult.value

      // Print the validation result to the console
      console.log("Validation Result:", botMessage)
    }
  } catch (error) {
    console.error("Validation failed:", error)
  }
};

testValidation()
