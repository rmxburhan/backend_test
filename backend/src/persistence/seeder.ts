import mongoose from "mongoose";
import Book, { IBook } from "../models/book.model";
import Member, { IMember } from "../models/member.model";
import config from "../config";
import dotenv from "dotenv";
const booksData = require("../../data/books.json");
const membersData = require("../../data/members.json");
dotenv.config();

const main = async () => {
  try {
    await mongoose.connect(config.mongo_uri);
    let books: IBook[] = [];
    let members: IMember[] = [];

    const countBooks = await Book.countDocuments();
    if (countBooks !== 0) return;
    booksData.forEach((x: any) => {
      books.push(
        new Book({
          code: x.code,
          title: x.title,
          author: x.author,
          stock: x.stock,
        })
      );
    });
    await Book.insertMany(books);
    console.log("Seed books success");

    const countMemo = await Member.countDocuments();
    if (countMemo) {
      if (countMemo !== 0) return;
      membersData.forEach((x: any) => {
        members.push(
          new Member({
            code: x.code,
            name: x.name,
          })
        );
      });
      await Member.insertMany(members);
    }
  } catch (error) {
    console.error();
    process.exit();
  } finally {
    console.log("Seed success");
    process.exit();
  }
};
main();
