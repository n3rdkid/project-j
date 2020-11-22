import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const ContactSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    message: {
      type: String,
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
ContactSchema.plugin(mongoosePaginate);
const Contact = model("contacts", ContactSchema);

export default Contact;
