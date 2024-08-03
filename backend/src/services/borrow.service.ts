import dayjs from "dayjs";
import Book from "../models/book.model";
import Borrow from "../models/borrow.model";
import Member from "../models/member.model";

export const borrowBook = async (id: string, memberId: string) => {
  const book = await Book.findById(id);
  if (!book) {
    const error = new Error("id not found");
    error.name = "BadRequest";
    throw error;
  }
  let member = await Member.findById(memberId);
  if (!member) {
    const error = new Error("id not found");
    error.name = "BadRequest";
    throw error;
  }

  if (0 < member.penalty.length) {
    if (member.latestPenalty!.inPenalty) {
      const error = new Error("The member has a penalty");
      error.name = "BadRequest";
      throw error;
    }
  }

  const memberBorrowData = await Borrow.find({
    member: member.id,
    returnDate: undefined,
  });

  if (memberBorrowData.length >= 2) {
    const error = new Error("You cannot borrow more than 2 books");
    error.name = "BadRequest";
    throw error;
  }

  const borrowData = await Borrow.find({
    returnDate: undefined,
    book: book.id,
  }).sort({ cratedAt: -1 });
  if (book.stock - borrowData.length === 0) {
    const error = new Error();
    error.message = "book is not available";
    error.name = "BadRequest";
    throw error;
  }

  const hasBorrowed = borrowData.filter((x) => x.member == member.id);
  if (hasBorrowed.length > 0) {
    const error = new Error();
    error.message = "Member already borrow this book";
    error.name = "BadRequest";
    throw error;
  }

  const newBorrow = new Borrow({
    member: member.id,
    book: book.id,
    borrowDate: dayjs().toDate().toDateString(),
  });
  return await newBorrow.save();
};

export const returnBook = async (borrowId: string) => {
  const borrow = await Borrow.findById(borrowId);
  if (!borrow) {
    const error = new Error("Borrow data not found");
    error.name = "BadRequest";
    throw error;
  }

  if (borrow.returnDate) {
    const error = new Error("this book is already returned");
    error.name = "BadRequest";
    throw error;
  }

  const returnDate = dayjs().toDate().toDateString();
  borrow.returnDate = new Date(returnDate);
  if (borrow.getPenalty) {
    await Member.findByIdAndUpdate(borrow.member, {
      $addToSet: {
        penalty: {
          borrow: borrow.id,
          startDate: dayjs().toDate().toDateString(),
          endDate: dayjs().add(3, "day").toDate().toDateString(),
        },
      },
    });
  }
  return await borrow.save();
};

export default {
  borrowBook,
  returnBook,
};
