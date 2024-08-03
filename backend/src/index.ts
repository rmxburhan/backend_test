import { createServer } from "http";
import app from "./app";
import config from "./config";

const http = createServer(app);

http.listen(config.port, () => {
  console.log("Server running at port : " + config.port);
});
