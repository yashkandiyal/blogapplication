const express = require("express");
const cors = require("cors");
const LoginRoute = require("./routes/LoginRoute.js");
const LogoutRoute = require("./routes/LogoutRoute.js");
const RegisterRoute = require("./routes/RegisterRoute.js");
const CreatePostsRoute = require("./routes/CreatePostsRoute.js");
const FetchPosts = require("./routes/FetchPosts.js");
const mongoose = require("mongoose");
require("dotenv/config");
const Authentication = require("./Authentication.js");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const FetchPostById = require("./routes/FetchPostById.js");
// Initialize dotenv
const uri = process.env.URI_STRING;

mongoose
  .connect(uri)
  .then(() => console.log("mongodb connection successfull!"))
  .catch((e) => console.log("error in connecting to mongodb", e));

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
const port = 3000;

// Login route
app.use("/login", LoginRoute);
// Register route
app.use("/register", RegisterRoute);
//posts route
app.use("/posts", FetchPosts);
//render a particular post by id
app.use("/posts/:id",FetchPostById)
// create posts route
app.use("/create", CreatePostsRoute);
//logout rote
app.use("/logout", Authentication, LogoutRoute);

app.listen(port, () => {
  console.log(`Server is running at port:${port}`);
});
