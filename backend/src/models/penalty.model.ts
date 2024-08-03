import dayjs from "dayjs";
import { Schema, Types, model } from "mongoose";

export interface IPenalty extends Document {
  borrow: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  inPenalty: boolean;
}

export const penaltySchema = new Schema<IPenalty>(
  {
    borrow: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
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

penaltySchema.virtual("inPenalty").get(function (this: IPenalty) {
  return this.endDate > dayjs().toDate();
});
