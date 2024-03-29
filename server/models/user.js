import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  beats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
  ],
});

export default mongoose.model("User", userSchema);
