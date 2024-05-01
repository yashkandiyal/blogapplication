import express from "express";
import cors from "cors";
import LoginRoute from "./routes/LoginRoute.js";
import RegisterRoute from "./routes/RegisterRoute.js";
import mongoose from "mongoose";
import "dotenv/config";
// Initialize dotenv
const uri = process.env.URI_STRING;

mongoose
  .connect(uri)
  .then(() => console.log("mongodb connection successfull!"))
  .catch((e) => console.log("error in connecting to mongodb", e));

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
const port = 3000;

// Login route
app.use("/", LoginRoute);
// Register route
app.use("/register", RegisterRoute);

app.listen(port, () => {
  console.log(`Server is running at port:${port}`);
});
