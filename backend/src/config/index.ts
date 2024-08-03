export default {
  port: process.env.PORT || 3000,
  mongo_uri:
    (process.env.NODE_ENV == "test"
      ? process.env.TEST_MONGODB_URI
      : process.env.MONGODB_URI) || "mongodb://localhost:27017/my_test",
};
