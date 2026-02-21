import mongoose from "mongoose";

const userSchme = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model("users", userSchme)

export default UserModel;
