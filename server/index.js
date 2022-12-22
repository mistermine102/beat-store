import express from "express";
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose"

const dbUrl = "mongodb+srv://szymonix:szymonix@atlascluster.0207bfc.mongodb.net/?retryWrites=true&w=majority"

const app = express();

mongoose.set('strictQuery', true);

mongoose.connect(dbUrl)
    .then(() => console.log("Connected to the database!"))
    .catch(error => console.log(error))

app.use(bodyParser.json())
app.use(cors())

app.get("/", (req, res) => {
    console.log("get request")
    res.json("Message from the server")
})

app.listen(3000, () => console.log("Server listening..."))