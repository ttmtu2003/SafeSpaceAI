const Joi = require('joi');
const { validateCyberbullyingUsingGPT } = require('./cyberbullying')

module.exports = {
    JoiWithCyberbullying: Joi.extend(joi => ({
        type: 'string',
        base: joi.string(),
        rules: {
            cyberbullying: {
                async validate(value) {
                    try {
                        // Await the result of validateCyberbullyingUsingGPT
                        const botMessage = await validateCyberbullyingUsingGPT(value)
                        
                        // Return the botMessage
                        return botMessage
                    } catch (error) {
                        throw new Error(`Validation failed: ${error.message}`)
                    }
                }
            }
        }
    }))
};
