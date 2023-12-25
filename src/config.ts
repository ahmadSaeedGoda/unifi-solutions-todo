import dotenv from 'dotenv';

dotenv.config();

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not provided in the environment variables.');
}

export default {
  MONGODB_URI,
};
