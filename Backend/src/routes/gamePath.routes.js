import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import gamePathController from "../controllers/gamePath.controller.js";
import multer from "multer";

const router = express.Router();
const upload = multer();

// POST
router.post(
  "/",
  authMiddleware.authenticate,
  authMiddleware.authorize,
  upload.none(),
  gamePathController.create
);
// GET
router.get("/", authMiddleware.authenticate, gamePathController.list);
router.get("/:id", authMiddleware.authenticate, gamePathController.getById);
// PUT
router.put("/:id", authMiddleware.authenticate, gamePathController.update);
// DELETE
router.delete("/:id", authMiddleware.authenticate, gamePathController.destroy);
// EXTRA
router.put(
  "/extra/:id",
  authMiddleware.authenticate,
  gamePathController.updateGamePathByAllAnswerByMajority
);
export default router;
