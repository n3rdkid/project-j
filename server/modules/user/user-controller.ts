import { Request, Response, NextFunction } from "express";

class UserController {
  static signIn = async (req: Request, res: Response, next: NextFunction) => {
    res.send("Sign IN");
  };

  static signUp = async (req: Request, res: Response, next: NextFunction) => {
    res.send("Sign Up");
  };

  static signOut = async (req: Request, res: Response, next: NextFunction) => {
    res.send("Sign Out");
  };

  static currentUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.send("Current User");
  };
}
export default UserController;
