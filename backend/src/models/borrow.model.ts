import dayjs from "dayjs";
import { Schema, Types, model } from "mongoose";
import { getDataeDiff } from "../utils/datediff";

export interface IBorrow extends Document {
  member: Types.ObjectId;
  book: Types.ObjectId;
  borrowDate: Date;
  returnDate?: Date;
  getPenalty?: boolean | undefined;
}

export const borrowSchema = new Schema<IBorrow>(
  {
    member: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    borrowDate: {
      type: Date,
      required: true,
      default: () => dayjs().toDate(),
    },
    returnDate: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

borrowSchema.virtual("getPenalty").get(function (this: IBorrow) {
  if (this.returnDate) {
    return getDataeDiff(this.returnDate, this.borrowDate) > 7;
  } else {
    return undefined;
  }
});

const Borrow = model<IBorrow>("Borrow", borrowSchema);
export default Borrow;
