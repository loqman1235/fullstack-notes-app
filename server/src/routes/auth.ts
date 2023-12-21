import express from "express";
import * as authController from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import {
  userValidationRules,
  validateEmail,
  validatePassword,
} from "../validators/userValidator";

const router: express.Router = express.Router();

router.post(
  "/register",
  validationMiddleware(userValidationRules),
  authController.registerUser
);
router.post(
  "/login",
  validationMiddleware([validateEmail, validatePassword]),
  authController.loginUser
);
router.post("/logout", authMiddleware, authController.logoutUser);
export default router;
