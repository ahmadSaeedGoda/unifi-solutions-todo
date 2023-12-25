import mongoose, { Schema, Document } from 'mongoose';

export interface Todo extends Document {
  userId: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

const TodoSchema: Schema = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
});

export default mongoose.model<Todo>('Todo', TodoSchema);
