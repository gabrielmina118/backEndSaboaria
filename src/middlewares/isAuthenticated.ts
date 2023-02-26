import { NextFunction, Request, Response } from "express";
import BaseError from "../error/BaseError";
import Authenticator from "../service/Authenticator";

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization!;

  if (!authHeader) {
    throw new BaseError("JWT TOKEN is missing", 404);
  }

  try {
    const decode = Authenticator.getToken(authHeader);
    req.user = {
      id: decode.id,
    };
    return next();
  } catch (error) {
    throw new BaseError("Invalid JWT Token");
  }
}
