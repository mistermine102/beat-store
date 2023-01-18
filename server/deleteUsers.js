import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import mongoose from "mongoose"
import User from "./models/user.js"

const dbUrl = process.env.DB_URL;

mongoose.set("strictQuery", false);
mongoose
    .connect(dbUrl)
    .then(() => console.log("connected to the database"))
    .catch((err) => console.log(err));

User.deleteMany().then(res => console.log(res))

