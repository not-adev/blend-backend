
import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true
    },

    currentSong: {
      songId: String,
      title: String,
      artist: String,
      streamUrl: String,
      thumbnail: String
    },
    

    queue: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Queue",
    }],

    startedAt: {
      type: Date
    },
    duration: {
      type: Number
    },

    currentIndex: {
      type: Number,
    },

    paused: {
      type: Boolean,
      default: true
    },

    pausedAt: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export const Session = mongoose.model("Session", sessionSchema);