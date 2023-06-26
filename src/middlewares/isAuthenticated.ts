import { NextFunction, Request, Response } from "express";
import BaseError from "../error/BaseError";
import Authenticator from "../libService/Authenticator";

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization!;

  if (!authHeader) {
    res.status(404).json({ message: "JWT TOKEN is missing" });
  }

  try {
    const decode = Authenticator.getToken(authHeader);
    req.user = {
      id: decode.id,
    };
    return next();
  } catch (error:any) {
    res.status(401).json({ message: error.message });
  }
}
