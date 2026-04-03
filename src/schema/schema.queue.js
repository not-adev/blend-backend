import mongoose from "mongoose";

const queueSchema = new mongoose.Schema(
{
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true
  },

  songId: {
    type: String,
    required: true
  },

  title: String,

  artist: String,

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