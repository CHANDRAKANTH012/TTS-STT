import mongoose from "mongoose";

const transcriptSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
    result: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Transcript =
  mongoose.models.Transcript || mongoose.model("Transcript", transcriptSchema);

export default Transcript;

// export default ;
