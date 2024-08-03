import { NextFunction, Request, Response } from "express";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const path = req.path;
  const method = req.method;
  if (req.path.includes("/api")) {
    return res.status(404).json({
      message: `${method} ${path} not found`,
    });
  }
};
export default notFoundHandler;
