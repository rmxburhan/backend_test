import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import errorHandlerMiddleware from "./middleware/errorHandler.middleware";
import routeInit from "./routes";
import dotenv from "dotenv";
import startDb from "./persistence/db";
import notFoundHandler from "./middleware/notFound.middleware";
import swaggerInit from "./startup/docs";
dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
swaggerInit(app);
routeInit(app);
app.use(errorHandlerMiddleware);
app.use(notFoundHandler);
startDb();

export default app;
