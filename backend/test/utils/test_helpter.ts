import dayjs from "dayjs";
import Book from "../../src/models/book.model";
import Borrow from "../../src/models/borrow.model";
import Member from "../../src/models/member.model";

interface Book {
  code: string;
  title: string;
  author: string;
  stock: number;
}

interface Member {
  code: string;
  name: string;
}

export const initialBooks: Book[] = require("../../data/books.json");

export const initialMembers: Member[] = require("../../data/members.json");

/**
 *
 * This function will initialize borrows for
 * 1. Member who has returned the book but late
 *  */
export const initializeBorrowAndPenalty = async () => {
  await Borrow.deleteMany();
  const book = await Book.find();
  const member = await Member.find();

  const returnLate = await Borrow.create({
    book: book[0].id,
    member: member[0].id,
    borrowDate: dayjs().add(-12).toDate().toDateString(),
    returnDate: dayjs().add(7, "day").toDate().toDateString(),
  });

  // await member?.updateOne(
  //   {
  //     $addToSet: {
  //       penalty: {
  //         borrow: returnLate.id,
  //         startDate: dayjs().toDate().toDateString(),
  //         endDate: dayjs().toDate().toDateString(),
  //       },
  //     },
  //   },
  //   { new: true }
  // );

  console.log(member);
};
