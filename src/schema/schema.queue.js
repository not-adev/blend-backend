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


  thumbnailUrl: String,

  streamUrl: String,

  addedBy: String,

  position: {
    type: Number
  }
},
{ timestamps: true }
);

export const Queue = mongoose.model("Queue", queueSchema);