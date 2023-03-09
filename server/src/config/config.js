const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('production', 'development', 'test')
      .required(),
    PORT: Joi.number().default(5000),
    MESSARI_API_KEY: Joi.string().required(),
    MESSARI_API_URL: Joi.string().required(),
    CRYPTR_SECRET: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  messariApiKey: envVars.MESSARI_API_KEY,
  messariApiUrl: envVars.MESSARI_API_URL,
  cryptrSecret: envVars.CRYPTR_SECRET,
  jwtSecret: envVars.JWT_SECRET,
};
