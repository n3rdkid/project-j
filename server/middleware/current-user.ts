import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/**
 * An interface that specifies the current user information
 */
interface UserPayload {
  id: string;
  email: string;
}
/**
 * Augmenting Type definition to Request interface since Request doesn't already contain
 * information about currentUser property so .... req.currentUser doesn't exist
 */
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}
/**
 * This middleware takes the jwt from the current cookie-session, extracts current user and returns it.
 */
const currentUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    return next();
  }
  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
    return res.send({ currentUser: payload });
  } catch {}
  next();
};

export default currentUser;
