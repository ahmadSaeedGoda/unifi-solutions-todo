import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRouter from './routes/auth';
import todoRoutes from './routes/todo';
import userRouter from "./routes/user";
import { authenticate } from "./middleware/authMiddleware";
import { errorHandler } from "./middleware/errorMiddleware";
import config from './config';

interface UserBasicInfo {
  _id: string;
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserBasicInfo | null;
    }
  }
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cors());

mongoose.connect(config.MONGODB_URI);

app.use(authRouter);
app.use("/users", authenticate, userRouter);
app.use('/todos', todoRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
