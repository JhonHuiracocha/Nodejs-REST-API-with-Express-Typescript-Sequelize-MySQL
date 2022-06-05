import { Request, Response } from "express";

import { User } from "../models/user";
import { encryptPassword } from "../helpers/bcrypt";

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const newUser = {
    username,
    email,
    password: await encryptPassword(password),
  };

  const userFound = await User.findOne({ where: { email, status: 1 } });

  if (userFound)
    return res.status(409).json({ msg: "The user already exists" });

  await User.create(newUser);

  res.status(201).json({ msg: "User created successfully" });
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll({ where: { status: 1 } });
  return res.json({ results: users });
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const userFound = await User.findOne({ where: { id, status: 1 } });

  if (!userFound)
    return res.status(404).json({ msg: "The user has not been found" });

  res.json({ results: userFound });
};

export const updateUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  const newUser = { username, email, password };

  const userFound = await User.findOne({ where: { id, status: 1 } });

  if (!userFound)
    return res.status(404).json({ msg: "The user has not been found" });

  await User.update(newUser, { where: { id } });

  res.json({ msg: "User updated successfully" });
};

export const deleteUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const userFound = await User.findOne({ where: { id, status: 1 } });

  if (!userFound)
    return res.status(404).json({ msg: "The user has not been found" });

  await User.update({ status: 0 }, { where: { id } });

  res.json({ msg: "User deleted successfully" });
};
