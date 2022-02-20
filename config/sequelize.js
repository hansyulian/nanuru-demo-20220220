require('dotenv').config();
const { env } = process;

const dbConfig = {
  database: env.API_DB_DATABASE || 'nanuru-demo',
  username: env.API_DB_USERNAME || 'developer',
  password: env.API_DB_PASSWORD || 'developer',
  host: env.API_DB_HOST || '127.0.0.1',
  port: env.API_DB_PORT ? parseInt(env.API_DB_PORT) : 5432,
  dialect: 'postgres'
};

console.log('db config', dbConfig);

module.exports = dbConfig;