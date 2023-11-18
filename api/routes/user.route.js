import express from "express";
import { test } from "../controllers/user.controller.js";

const router = express.Router();
// routes
router.get("/test", test);

export default router;
