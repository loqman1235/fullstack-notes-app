import { ValidationChain, body } from "express-validator";

export const validateUsername: ValidationChain = body("username")
  .notEmpty()
  .withMessage("Username is required")
  .trim()
  .escape();

export const validateEmail: ValidationChain = body("email")
  .notEmpty()
  .withMessage("Email is required")
  .bail()
  .trim()
  .escape()
  .isEmail()
  .withMessage("Email is invalid");

export const validatePassword: ValidationChain = body("password")
  .notEmpty()
  .withMessage("Password is required")
  .trim()
  .escape();

export const userValidationRules: ValidationChain[] = [
  validateUsername,
  validateEmail,
  validatePassword,
];
