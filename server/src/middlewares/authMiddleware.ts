import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const authMiddleware: RequestHandler = async (req, res, next) => {
  const token: string | undefined = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.body.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
};

export default authMiddleware;
