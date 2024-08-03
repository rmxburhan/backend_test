import { Schema, model } from "mongoose";

export interface IBook extends Document {
  code: string;
  title: string;
  author: string;
  stock: number;
}

export const bookSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Book = model<IBook>("Book", bookSchema);
export default Book;
