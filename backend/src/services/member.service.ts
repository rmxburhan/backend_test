import Borrow from "../models/borrow.model";
import Member, { IMember } from "../models/member.model";

export const getMembers = async ({ name }: { name?: string }) => {
  const filter: { name?: any } = {};
  if (name) filter.name = { regex: "^" + name, $options: "i" };
  const data: any[] = [];
  const members = await Member.find(filter);
  for (const member of members) {
    const booksCount = await Borrow.countDocuments({
      member: member.id,
      returnDate: undefined,
    });
    member.borrowedBook = booksCount;
    data.push({
      id: member.id,
      code: member.code,
      name: member.name,
      borrowedBooks: member.borrowedBook,
    });
  }
  console.log(data);
  return data;
};

export default {
  getMembers,
};
