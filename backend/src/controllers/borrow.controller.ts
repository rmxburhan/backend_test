import { NextFunction, Request, Response } from "express";
import borrowService from "../services/borrow.service";
import { validateInputPostBorrowReturn } from "../validator/borrow.validator";

export const postBorrow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = validateInputPostBorrowReturn.validate(req.body);
    if (error) throw error;
    const { bookId, memberId } = value;

    const borrow = await borrowService.borrowBook(bookId, memberId);

    return res.status(200).json({
      message: "Borrow has been saved.",
      data: borrow,
    });
  } catch (error) {
    next(error);
  }
};

export const postReturn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const borrow = await borrowService.returnBook(id);

    return res.status(200).json({
      message: "Book has been returned.",
      data: borrow,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  postBorrow,
  postReturn,
};
