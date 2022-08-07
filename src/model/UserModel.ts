import { model, Schema } from "mongoose";
import { hash } from "argon2";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true }
);
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const hashPassword = await hash(this.password);
  this.password = hashPassword;
  next();
});

export default model("User", UserSchema);
