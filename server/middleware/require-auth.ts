import { Request, Response, NextFunction } from "express";
import NotAuthorizedError from "../errors/not-authorized";

/**
 * NOTE : currentUser middleware should be ran before this middleware
 *
 */
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  next();
};
