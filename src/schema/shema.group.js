import mongoose from "mongoose";


const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],

    publicPrivate: {
      type: Boolean,
      default: false 
    },
    
    requests: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],

    mode: {
      type: String,
      enum: ["HOST", "FREE", "VOTING"],
      default: "HOST"
    },
    live: {
      type: Boolean ,
      default : false ,
    },
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session"
    }
  },
  { timestamps: true }
);

export const Group = mongoose.model("Group", groupSchema);