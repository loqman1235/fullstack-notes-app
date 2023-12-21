import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {} from "express-validator";
import User from "../models/User";
import { handleErrorResponse } from "./errorHandlers";

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  token?: string;
  error?: string;
}

interface IUser {
  username: string;
  email: string;
}

// Register user
export const registerUser: RequestHandler<
  unknown,
  unknown,
  RegisterRequest,
  unknown
> = async (req, res) => {
  const { username, email, password: plainTextPassword } = req.body;

  try {
    // Password hashing
    const salt = await bcrypt.genSalt();
    const hashedPassword: string = await bcrypt.hash(plainTextPassword, salt);

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...others } = newUser.toObject();
    const response: ApiResponse<IUser> = {
      success: true,
      data: others,
    };
    res.status(201).json(response);
  } catch (error) {
    handleErrorResponse(res, error as Error);
  }
};

// Login user
export const loginUser: RequestHandler<
  unknown,
  unknown,
  LoginRequest,
  unknown
> = async (req, res) => {
  const { email, password: plainTextPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "Wrong credentials" });
    }

    const isMatch: boolean = await bcrypt.compare(
      plainTextPassword,
      user.password
    );
    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, error: "Wrong credentials" });
    }

    const token: string = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...others } = user.toObject();

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    const response: ApiResponse<IUser> = {
      success: true,
      data: others,
      token,
    };

    res.status(200).json(response);
  } catch (error) {
    handleErrorResponse(res, error as Error);
  }
};

// Logout user
export const logoutUser: RequestHandler = async (req, res) => {
  try {
    res.clearCookie("token");
    const response: ApiResponse<IUser> = {
      success: true,
    };
    res.status(200).json(response);
  } catch (error) {
    handleErrorResponse(res, error as Error);
  }
};
