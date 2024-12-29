import express from "express";
import questionController from "../controllers/question.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// POST
router.post(
  "/",
  authMiddleware.authenticate,
  authMiddleware.authorize,
  questionController.create
);
// GET
router.get("/", authMiddleware.authenticate, questionController.list);
router.get("/:id", authMiddleware.authenticate, questionController.getById);
router.get(
  "/number/:number",
  authMiddleware.authenticate,
  questionController.getByNumber
);
// PUT
router.put(
  "/:id",
  authMiddleware.authenticate,
  authMiddleware.authorize,
  questionController.update
);
// DELETE
router.delete(
  "/:id",
  authMiddleware.authenticate,
  authMiddleware.authorize,
  questionController.destroy
);
// EXTRA
// router.put(
//   "/extra/chosenAnswer",
//   authMiddleware.authenticate,
//   questionController.getAnswer
// );

export default router;
