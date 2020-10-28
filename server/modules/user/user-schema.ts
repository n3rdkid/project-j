import mongoose, { Schema, model } from "mongoose";
import { Password } from "../../services/Password";

/**
 * Attributes for user sign-up
 *  */
interface UserSignUpAttrs {
  email: string;
  password: string;
}
// An interface that describes the properties that a user model contains
interface UserModel extends mongoose.Model<UserDoc> {
  signUp(attrs: UserSignUpAttrs): UserDoc;
}
// An interface that describes the properties that a (single) user document contains
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  name?: string;
}
const UserSchema = new Schema(
  {
    // name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    // gender: { type: String, enum: ["male", "female", "other"] },
    // avatar: { type: String },
    // image: { type: Schema.Types.Mixed },
    // date_of_birth: { type: Date },
    // bio: { type: String },
    // email_verified: { type: Boolean, required: true, default: false },
    // email_verified_request_date: { type: Date },
    // password_reset_code: { type: String },
    // password_reset_request_date: { type: Date },
    // last_password_change_date: { type: Date },
    // is_active: { type: Boolean, required: true, default: false },
    // is_added_by_admin: { type: Boolean, require: true, default: false },
    // skills: { type: [String] },
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

UserSchema.statics.signUp = (attrs: UserSignUpAttrs) => {
  return new User(attrs);
};

UserSchema.pre("save", async function (done) {
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

const User = model<UserDoc, UserModel>("users", UserSchema);

export default User;
