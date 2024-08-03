import Joi from "joi";

export const validateInputPostBorrowReturn = Joi.object({
  memberId: Joi.string().required(),
  bookId: Joi.string().required(),
});
