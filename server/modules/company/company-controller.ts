import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../../errors/bad-request-error";
import { Password } from "../../services/Password";
import Company from "./company-schema";
import multer from "multer";
import sharp from "sharp";
var storage = multer.memoryStorage();
var upload = multer({
  storage: storage,
  // fileFilter(req, file, cb) {
  //   if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
  //     cb(new Error("Please upload an image"));
  //   }
  //   cb(null, true);
  // },
}).single("logo");
class CompanyController {
  static registerCompany = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await Company.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email already in use!");
    }
    const company = new Company({ email, password });
    await company.save();
    const token = jwt.sign(
      { id: company.id, email: company.email },
      process.env.JWT_KEY!
    );
    //Store in session
    req.session = {
      jwt: token,
    };
    res.status(201).json({});
  };
  static signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingCompany = await Company.findOne({ email });
    if (!existingCompany) {
      throw new BadRequestError("Invalid credentials!");
    }
    const passwordMatched = await Password.compare(
      existingCompany.password,
      password
    );
    if (!passwordMatched) {
      throw new BadRequestError("Invalid credentials!");
    }
    //Generate webtoken
    const token = jwt.sign(
      { id: existingCompany.id, email: existingCompany.email },
      process.env.JWT_KEY!
    );
    //Store in session
    req.session = {
      jwt: token,
    };
    return res.status(200).json(existingCompany);
  };
  static getProfileInfo = async (req: Request, res: Response) => {
    const email = req.currentUser?.email;
    if (!email) {
      throw new BadRequestError("Invalid Request!");
    }
    const existingCompany = await Company.findOne(
      { email },
      "name location logo is_verified"
    );

    if (!existingCompany) {
      throw new BadRequestError("Invalid Request!");
    }

    return res.status(200).json(existingCompany);
  };
  static updateProfileInfo = async (req: Request, res: Response) => {
    const email = req.currentUser?.email;
    const { name, location } = req.body;
    if (!email) {
      throw new BadRequestError("Invalid Request!");
    }
    const existingCompany = await Company.findOne({ email });
    if (!existingCompany) {
      throw new BadRequestError("Invalid Request!");
    }
    const updatedCompany = await Company.findOneAndUpdate(
      { email },
      {
        name,
        location,
      },
      { new: true, useFindAndModify: false }
    );
    res.status(200).send(updatedCompany);
  };
  static updateLogo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    upload(req, res, async (err: any) => {
      if (err) {
        // A Multer error occurred when uploading.
        throw new BadRequestError(err.message);
      }
      const email = req.currentUser?.email;
      const logo = req.file.buffer;
      if (!email) {
        throw new BadRequestError("Invalid Request!");
      }
      const existingCompany = await Company.findOne({ email });
      if (!existingCompany) {
        throw new BadRequestError("Invalid Request!");
      }
      const updatedCompany = await Company.findOneAndUpdate(
        { email },
        {
          logo,
        },
        { new: true, useFindAndModify: false }
      );
      res.status(200).send(updatedCompany);
    });
  };
}
export default CompanyController;
