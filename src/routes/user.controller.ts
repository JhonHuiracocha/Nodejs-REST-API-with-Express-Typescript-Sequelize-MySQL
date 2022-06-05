import { Router } from "express";

import {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/user.controller";

const router = Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

export default router;
