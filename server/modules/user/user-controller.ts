import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../../errors/bad-request-error";
import { Password } from "../../services/Password";
import User from "./user-schema";
import {mailOptions,transporter} from "../../services/Email"
class UserController {
  static signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials!");
    }
    const passwordMatched = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordMatched) {
      throw new BadRequestError("Invalid credentials!");
    }
    //Generate webtoken
    const token = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY!
    );
    //Store in session
    req.session = {
      jwt: token,
    };
    return res.status(200).json(existingUser);
  };

  static signUp = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email already in use!");
    }
    const user = User.signUp({ email, password });
    await user.save();
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );
    //Store in session
    req.session = {
      jwt: token,
    };
    res.status(201).json(user);
  };

  static signOut = async (req: Request, res: Response) => {
    req.session = null;
    res.send({});
  };

  static currentUser = async (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  };

  static forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Request failed");
    }
    mailOptions.to="sauravads123@gmail.com"
    mailOptions.subject="Password Reset"
  const token = jwt.sign(
      {email},
      process.env.JWT_KEY!
  );
       mailOptions.html=`Reset your password at <a href="localhost:5000/api/users/reset/${token}">Click Here</a>`
    const response=await transporter.sendMail(mailOptions);
    res.status(200).send({})
  };
}
export default UserController;
