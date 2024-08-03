import { Express, Router } from "express";
import { getMembers } from "../controllers/member.controller";
import { getBooks } from "../controllers/book.controller";
import { postBorrow, postReturn } from "../controllers/borrow.controller";
import errorHandlerMiddleware from "../middleware/errorHandler.middleware";
import notFoundHandler from "../middleware/notFound.middleware";
export default (app: Express) => {
  const apiRouter = Router();

  apiRouter.get("/members", getMembers);
  apiRouter.get("/books", getBooks);
  apiRouter.post("/borrows", postBorrow);
  apiRouter.post("/borrows/:id/return", postReturn);

  app.use("/api", apiRouter);
  app.use(errorHandlerMiddleware);
  app.use(notFoundHandler);
};
