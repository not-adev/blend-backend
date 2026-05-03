import mongoose from "mongoose";

const queueSchema = new mongoose.Schema(
{
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    required: true
  },

  songId: {
    type: String,
    required: true
  },

  title: String,


  thumbnail: String,

  streamUrl: String,

  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  position: {
    type: Number
  }
},
{ timestamps: true }
);

export const Queue = mongoose.model("Queue", queueSchema);