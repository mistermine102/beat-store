import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  url: String,
});

export default mongoose.model("File", fileSchema);
