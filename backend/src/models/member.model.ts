import { Schema, model } from "mongoose";
import { IPenalty, penaltySchema } from "./penalty.model";

export interface IMember extends Document {
  code: string;
  name: string;
  penalty: IPenalty[];
  latestPenalty?: IPenalty;

  borrowedBook?: number;
}

export const memberSchema = new Schema<IMember>(
  {
    code: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    penalty: {
      type: [penaltySchema],
      default: [],
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

memberSchema.virtual("latestPenalty").get(function (this: IMember) {
  return this.penalty[this.penalty.length - 1];
});

const Member = model<IMember>("Member", memberSchema);
export default Member;
