export default {
  port: process.env.PORT || 3000,
  mongo_uri: process.env.MONGODB_URI || "mongodb://localhost:27017/my_test",
};
