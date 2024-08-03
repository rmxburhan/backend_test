import Book, { IBook } from "../models/book.model";
import Borrow from "../models/borrow.model";

export const getBooks = async ({
  title,
  author,
}: {
  title?: string;
  author?: string;
}) => {
  const filter: { title?: any; author?: any } = {};

  if (title) filter.title = { $regex: "^" + title, $options: "i" };
  if (author) filter.author = { $regex: "^" + author, $options: "i" };

  let data = [];
  const books = await Book.find();
  for (const book of books) {
    const borrowed = await Borrow.countDocuments({
      book: book.id,
      returnDate: undefined,
    });
    let available = book.stock - borrowed;

    if (available == 0) {
      continue;
    }

    data.push({
      id: book.id,
      code: book.code,
      title: book.title,
      author: book.author,
      available: available,
    });
  }
  return data;
};

export default {
  getBooks,
};
