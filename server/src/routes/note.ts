import express from "express";
import * as noteController from "../controllers/noteController";
import authMiddleware from "../middlewares/authMiddleware";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { validateTitle } from "../validators/noteValidator";

const router: express.Router = express.Router();

router.post(
  "/",
  authMiddleware,
  validationMiddleware([validateTitle]),
  noteController.createNote
);
router.get("/", authMiddleware, noteController.getNotes);
router.get("/:noteId", authMiddleware, noteController.getNote);
router.put(
  "/:noteId",
  authMiddleware,
  validationMiddleware([validateTitle]),
  noteController.updateNote
);
router.delete("/:noteId", authMiddleware, noteController.removeNote);

export default router;
