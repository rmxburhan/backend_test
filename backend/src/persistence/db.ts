import mongoose from "mongoose";
import config from "../config";
export default () => {
  mongoose.connect(config.mongo_uri).then(() => {
    console.log(`Connected to databse`);
  });
};
