import { ValidationChain, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validationMiddleware = (validationRules: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validationRules.map((rule) => rule.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  };
};
