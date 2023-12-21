import { ValidationChain, body } from "express-validator";

export const validateTitle: ValidationChain = body("title")
  .notEmpty()
  .withMessage("Title is required")
  .trim()
  .escape();

export const validateText: ValidationChain = body("text")
  .notEmpty()
  .withMessage("Text is required")
  .trim()
  .escape();
