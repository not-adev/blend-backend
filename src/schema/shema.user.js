import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true
    },

    username: {
      type: String,
      required: true
    },

    recentSongs: {
      type: [String]
    },
    email: {
      type: String,
      required: true
    },
    groups: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group"
    }]
  },

  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);