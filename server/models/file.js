import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  url: String,
});

export default mongoose.model("File", fileSchema);
