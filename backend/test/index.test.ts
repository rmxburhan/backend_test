import { after, test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../src/app";
import Member from "../src/models/member.model";
import { initialBooks, initialMembers } from "./utils/test_helpter";
import Book from "../src/models/book.model";
import Borrow from "../src/models/borrow.model";

const api = supertest(app);
/**
 *
 */
beforeEach(async () => {
  await Member.deleteMany({});
  await Book.deleteMany({});
  await Borrow.deleteMany({});
  await Member.insertMany(initialMembers);

  await Member.findOneAndUpdate(
    { code: "M001" },
    {
      $set: {
        penalty: {},
      },
    }
  );
  await Book.insertMany(initialBooks);
});

/**
 * Member
 */
test("status code must be 200", async () => {
  await api
    .get("/api/members")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are three members", async () => {
  const response = await api.get("/api/members");

  assert.strictEqual(response.body.data.length, initialMembers.length);
});

test("check members data name", async () => {
  const response = await api.get("/api/members");

  const names = response.body.data.map((x: any) => x.name);
  assert(names.includes("Angga"));
});

/**
 * Book
 */
test("status code must be 200", async () => {
  await api
    .get("/api/books")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are 5 books", async () => {
  const response = await api.get("/api/books");

  assert.strictEqual(response.body.data.length, initialBooks.length);
});

test("check one of the book title", async () => {
  const response = await api.get("/api/books");

  const titles = response.body.data.map((x: any) => x.title);
  assert(titles.includes("Twilight"));
});

/**
 * Borrow
 */

test("borrow a book", async () => {
  const member = await Member.findOne({ code: "M003" });
  const book = await Book.findOne({ code: "JK-45" });
  await api
    .post("/api/borrows")
    .send({
      memberId: member!.id,
      bookId: book!.id,
    })
    .expect(200);
});

after(async () => {
  await mongoose.connection.close();
});
