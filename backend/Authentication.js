const jwt = require("jsonwebtoken");
require("dotenv/config");
const privateKey = process.env.SECRET_KEY;

const Authentication = (req, res, next) => {
  const token = req.cookies.token; // Access cookies using req.cookies.token
  console.log(token);

  if (!token) {
    return res.redirect("/login"); // Redirect to /register if token is missing
  }

  jwt.verify(token, privateKey, (err, decoded) => {
    if (err) {
      console.error("Error verifying token:", err);
      return res.status(200).redirect("/login"); // Redirect to /register if token is invalid or expired
    }
    req.user = decoded;
    next();
  });
};

module.exports = Authentication;
