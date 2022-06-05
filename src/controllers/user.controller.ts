import { Request, Response } from "express";

import { User } from "../models/user";

export const findAll = async (req: Request, res: Response) => {
  const users = await User.findAll({ where: { status: 1 } });
  return res.json({ results: users });
};
