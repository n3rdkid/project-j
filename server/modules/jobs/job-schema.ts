import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
/**
 * Interface that describes the attributes properties that a (single) job document contains
 */
// interface JobDoc extends mongoose.Document {}

const JobSchema = new Schema(
  {
    jobType: {
      type: String,
      enum: ["Part time", "Full time", "Internship", "Temporary", "Freelance"],
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobLevel: {
      type: String,
      enum: [
        "Internship/Trainee",
        "Entry Level",
        "Intermediate Level",
        "Senior Level",
      ],
    },
    jobDescription: {
      type: String,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);
JobSchema.plugin(mongoosePaginate);
const Job = model("jobs", JobSchema);

export default Job;
