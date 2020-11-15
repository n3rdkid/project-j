import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../../errors/bad-request-error";
import Job from "./job-schema";
class JobController {
  static addJob = async (req: Request, res: Response, next: NextFunction) => {
    const {
      jobType,
      jobTitle,
      company,
      location,
      jobLevel,
      expiryDate,
    } = req.body;
    const job = new Job({
      jobType,
      jobTitle,
      company,
      location,
      jobLevel,
      expiryDate,
    });
    job.save();
    res.status(201).send(job);
  };
  static editJob = async (req: Request, res: Response, next: NextFunction) => {
    const {
      jobType,
      jobTitle,
      company,
      location,
      jobLevel,
      expiryDate,
    } = req.body;
    const { id } = req.params;
    /**
     * Throw an error if ID is invalid
     */
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("Invalid ID");
    }
    /**
     * Check if job exists
     */
    const job = await Job.findById(id);
    if (!job) {
      throw new BadRequestError("No such job exists");
    }
    const newJob = await Job.findByIdAndUpdate(
      id,
      {
        jobType,
        jobTitle,
        company,
        location,
        jobLevel,
        expiryDate,
      },
      { new: true, useFindAndModify: false }
    );

    res.status(200).send(newJob);
  };
  static deleteJob = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    /**
     * Throw an error if ID is invalid
     */
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("Invalid ID");
    }
    const job = await Job.findById(id);
    if (!job) {
      throw new BadRequestError("No such job exists");
    }
    const deletedJob = await Job.findByIdAndDelete(id);

    res.status(200).send(deletedJob);
  };
  static retrieveJobsById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("Invalid ID");
    }
    const job = await Job.findById(id);
    if (!job) {
      throw new BadRequestError("No such job exists");
    }
    res.status(200).send(job);
  };
  static retrieveAllJobs = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const page = parseInt(req.params.page || "1");
    /**
     * Providing a default value in case no query param is sent
     */
    const {
      type = ["Part time", "Full time", "Internship", "Temporary", "Freelance"],
      level = [
        "Internship/Trainee",
        "Entry Level",
        "Intermediate Level",
        "Senior Level",
      ],
    } = req.query;
    console.log(req.query);
    const limit = 7;
    const jobs = await Job.find(
      { jobType: { $in: type }, jobLevel: { $in: level } },
      "jobType jobTitle company location jobLevel expiryDate"
    )
      .limit(limit)
      .skip((page - 1) * limit);
    res.status(200).send(jobs);
  };
}
export default JobController;
