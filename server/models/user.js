import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  beats: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

export default mongoose.model("User", userSchema);
