import { NextFunction, Request, Response } from "express";

export default (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let code = 500;
  switch (error.name) {
    case "BadRequest":
      code = 400;
      break;
    case "NotFound":
      code = 404;
    default:
      code = 500;
      break;
  }
  return res.status(code).json({
    errors: error.message,
  });
};
