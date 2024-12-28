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
router.get("/:id", authMiddleware.authenticate, userPathController.getById);
// PUT
router.put("/:id", authMiddleware.authenticate, userPathController.update);
// DELETE
router.delete("/:id", authMiddleware.authenticate, userPathController.destroy);

export default router;
