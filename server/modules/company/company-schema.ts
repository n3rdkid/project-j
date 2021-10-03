import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { Password } from "../../services/Password";

const CompanySchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String,     default: "", },
    logo: { data: Buffer, contentType: String },
    is_verified: { type: Boolean, default: false },
    email_verified: { type: Boolean, required: true, default: false },
    email_verified_request_date: { type: Date },
    is_active: { type: Boolean, required: true, default: false },
    is_added_by_admin: { type: Boolean, require: true, default: false },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = doc._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);
CompanySchema.pre("save", async function (done) {
  /**
   * Check if password is modified.
   * NOTE : Even creation is considered modification.
   */
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});
CompanySchema.plugin(mongoosePaginate);
const Company = model("company", CompanySchema);

export default Company;
