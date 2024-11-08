const { JoiWithCyberbullying } = require("./lib");

// Define a sample input string to test
const userInput = [
  // No offensive language example. 
  // However, this could still be considered cyberbullying when contextualized within a larger social media session.
  [{
    text: "You gonna weep? Go ahead, watch what unfolds tomorrow", 
    user:  {
      gender: "female",
      followerCount: 1000,
    },
    sender: {
      gender: "female",
      followerCount: 200,
    }
  }, { expectedOutput: "Yes" } ],
  // Offensive language example. However, this may not be cyberbullying since it could be a defensive response
  [
    {
      text: "You’re a jerk, don't talk to me like that",  // https://www.sciencedirect.com/science/article/pii/S0747563223004740
      sender: {
        gender: "female",
        followerCount: 1000,
      },
      user: {
        gender: "male",
        followerCount: 1300,
      }
    }, { expectedOutput: "Yes" }
  ],
  [{
    text: "You're such a loser.",
    user: {
      gender: "female",
      followerCount: 1000,
    },
    sender: {
      gender: "male",
      followerCount: 1300,
    }
  }, { expectedOutput: "Yes" } ],
  // Many netizens addressed the targets with pejorative language 
  // This is a typical form of cyberbullying response in China, whereby netizens attack the target's morality and insist their behavior is unacceptable
  [{
    text: "You were such a mess. If I were you, I would not have said that, but you did, so you're stupid.", // https://www.sciencedirect.com/science/article/pii/S0160791X23002518
    user:  {
      gender: "female",
      followerCount: 1000,
    },
    sender: {
      gender: "female",
      followerCount: 200,
    }
  }, { expectedOutput: "Yes" } ],
  [
    {
      text: "Let's all discuss the hangout here and not tell Bill about it.",
      sender: {
        gender: "female",
        followerCount: 100,
      },
      user: {
        gender: "male",
        followerCount: 400,
      }
    }, { expectedOutput: "Yes" }
  ],
  [
    {
      text: "Give me some good eats suggestion for SF",
      sender: {
        gender: "female",
        followerCount: 1000,
      },
      user: {
        gender: "female",
        followerCount: 1300,
      }
    }, { expectedOutput: "No" }
  ],
  [
    {
      text: "I am not satisfied with the service this company provided. The assistant did little to help me find good loan.",
      sender: {
        gender: "female",
        followerCount: 1000,
      },
      user: {
        gender: "female",
        followerCount: 1000,
      }
    }, { expectedOutput: "No" }
  ]
];

describe("JoiWithCyberbullying extension", () => {
  test.each(userInput)("validates input '%s' for cyberbullying", async (input, output) => {
    try {
      // Validate the sample input string using the extended Joi object
      const validationResult = await JoiWithCyberbullying.string().cyberbullying().validate(JSON.stringify(input));
  
      // Check if there is an error
      if (validationResult.error) {
        console.error("Validation failed:", validationResult.error);
      } else {
        // Access the response from the validation result
        const botResponse = await validationResult.value;
  
        // Determine expected response (Yes/No) based on the input message
        const { expectedOutput } = output;

        console.log({ botResponse });
        
        // Remove non-alphabetical characters and \n from the response
        const cleanedResponse = botResponse.replace(/[^a-zA-Z0-9\s]/g, ' ');

        // Trim the cleaned response to remove leading/trailing whitespace and newline characters
        const trimmedResponse = cleanedResponse.trim();
  
        // Extract the first word from the trimmed response
        const firstWord = trimmedResponse.split(" ")[0];
  
        // Assert that the first word of the trimmed response matches the expected output (Yes/No)
        expect(firstWord.includes(expectedOutput)).toBe(true);
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
  });
});
