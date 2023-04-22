import { passwordOptions, validateEmail } from "@utils/auth";
import { UserI } from "@modules/users/interfaces";
import { ModelType } from "@modules/interfaces";
import { paginate } from "@utils/paginate";
import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    password: {
      required: true,
      select: false,
      type: String,
      trim: true
    },
    email: {
      lowercase: true,
      required: true,
      unique: true,
      type: String,
      trim: true
    },
    fullname: {
      type: String,
      trim: true
    },
    sessions: [
      {
        status: Boolean,
        token: String,
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false,
    strictQuery: false,
    query: {
      paginate: paginate<UserI>
    }
  }
);

validateEmail(UserSchema, "Users");
passwordOptions(UserSchema);

export default model<UserI, ModelType<UserI>>("Users", UserSchema);
