import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    stringSession: {
      type: String,
      required: true,
    },

    telegramId: {
      type: Number,
      default: null,
    },

    firstName: {
      type: String,
      default: "",
    },

    username: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
