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
router.get(
  "/username/:username",
  authMiddleware.authenticate,
  userPathController.getByName
);
// PUT
router.put("/:id", authMiddleware.authenticate, userPathController.update);
// DELETE
router.delete("/:id", authMiddleware.authenticate, userPathController.destroy);
// EXTRA
router.get(
  "/question/next",
  authMiddleware.authenticate,
  userPathController.nextQuestion
);
router.put(
  "/question/addAnswer",
  authMiddleware.authenticate,
  userPathController.addAnswer
);

export default router;
