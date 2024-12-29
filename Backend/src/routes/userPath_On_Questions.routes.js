import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import userPath_On_QuestionController from "../controllers/userPath_On_Question.controller.js";

const router = express.Router();

// POST
router.post(
  "/",
  authMiddleware.authenticate,
  userPath_On_QuestionController.create
);
// GET
router.get(
  "/",
  authMiddleware.authenticate,
  userPath_On_QuestionController.list
);
router.get(
  "/:id",
  authMiddleware.authenticate,
  userPath_On_QuestionController.getById
);
// POST
router.put(
  "/:id",
  authMiddleware.authenticate,
  userPath_On_QuestionController.update
);
// DELETE
router.delete(
  "/:id",
  authMiddleware.authenticate,
  userPath_On_QuestionController.destroy
);

export default router;
