import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import gamePathController from "../controllers/gamePath.controller.js";

const router = express.Router();

// POST
router.post(
  "/",
  authMiddleware.authenticate,
  authMiddleware.authorize,
  gamePathController.create
);
// GET
router.get(
  "/",
  authMiddleware.authenticate,
  authMiddleware.authorize,
  gamePathController.list
);

export default router;
