const Joi = require('joi');
const { validateCyberbullying } = require('./lib/cyberbullying');

// Define custom Joi rule for cyberbullying detection
const cyberbullying = Joi.string().custom((value, helpers) => {
    return validateCyberbullying(value, helpers);
}, 'Cyberbullying Detection');

module.exports = {
    JoiWithCyberbullying: Joi.extend(joi => ({
        type: 'string',
        base: joi.string(),
        rules: {
            cyberbullying: {
                validate(value, helpers) {
                    return validateCyberbullying(value, helpers);
                }
            }
        }
    }))
};
