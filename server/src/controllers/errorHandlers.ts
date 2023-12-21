import { Response } from "express";

export const handleErrorResponse = (res: Response, error: Error): void => {
  console.error(error);
  res.status(500).json({ success: false, error: error.message });
};
