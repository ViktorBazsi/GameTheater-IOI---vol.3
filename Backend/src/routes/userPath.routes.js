import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import userPathController from "../controllers/userPath.controller.js";

const router = express.Router();

// POST
router.post(
  "/:gamePathId",
  authMiddleware.authenticate,
  userPathController.create
);
// GET
router.get("/", authMiddleware.authenticate, userPathController.list);

export default router;
