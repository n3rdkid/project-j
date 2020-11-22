import { Request, Response } from "express";
import Contact from "./contact-schema";

class ContactController {
  static newContactMessage = async (req: Request, res: Response) => {
    const { email, name, message } = req.body;
    const contactInfo = new Contact({
      email,
      name,
      message,
    });
    contactInfo.save();
    res.status(201).send({});
  };
  static getAllMessage = async (req: Request, res: Response) => {
    const contactRequest = await Contact.find({});
    res.status(200).send(contactRequest);
  };
}

export default ContactController;
