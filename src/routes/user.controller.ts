import { Router } from "express";

import { findAll } from "../controllers/user.controller";

const router = Router();

router.get("/", findAll);

export default router;
