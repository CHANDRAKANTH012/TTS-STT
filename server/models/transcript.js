import mongoose from "mongoose";

const transcriptSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
    result: { type: Boolean, default: false },
    // Just add this field to your existing schema
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Transcript =
  mongoose.models.Transcript || mongoose.model("Transcript", transcriptSchema);

export default Transcript;

// export default ;
