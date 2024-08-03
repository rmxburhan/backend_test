import { NextFunction, Request, Response } from "express";
import memberService from "../services/member.service";

export const getMembers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name }: { name?: string } = req.query;
    const members = await memberService.getMembers({ name });
    return res.status(200).json({
      message: "Members data retrieved",
      data: members,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getMembers,
};
