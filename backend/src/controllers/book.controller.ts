import { NextFunction, Request, Response } from "express";
import bookService from "../services/book.service";

export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, author }: { title?: string; author?: string } = req.query;

    const books = await bookService.getBooks({ title, author });
    return res.status(200).json({
      message: "Books data retrieved",
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getBooks,
};
