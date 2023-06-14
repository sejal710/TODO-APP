import mongoose, { Document, Model } from 'mongoose';

export interface Todo extends Document {
  title: string;
  description: string;
  image: string;
}

const todoSchema = new mongoose.Schema<Todo>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
}, {
  versionKey: false
});

export const todoModel: Model<Todo> = mongoose.model<Todo>('todo', todoSchema);


