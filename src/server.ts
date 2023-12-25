// src/server.ts
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import the cors middleware
import todoRoutes from './routes/todo';
import config from './config';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Apply CORS middleware
app.use(cors());

mongoose.connect(config.MONGODB_URI);

app.use('/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
