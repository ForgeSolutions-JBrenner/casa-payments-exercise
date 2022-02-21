import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { readdirSync } from "fs";

const morgan = require("morgan"); //assists us in understanding how the client and server are communicating
require("dotenv").config(); //allows us to use the information in the .env file

const app = express();

//configure mongodb database cluster
//get mongoose mongodb promise
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB Connected"))
  .catch((error) => console.log("Error in the connection to mongodb", error));

//middleware configuration, piece of code that will run in the middle configure checks or functionalities
app.use(express.json({ limit: "5mb" })); //json data that will be used to communicate from the client to the server
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
  })
);

//autoload routes
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)))
//configure server listener
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
