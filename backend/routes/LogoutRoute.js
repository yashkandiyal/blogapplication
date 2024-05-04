const express =require("express")
const router = express.Router();

// Route to log out the user
router.post("/", (req, res) => {
  // Clear the authentication token from cookies
  res.clearCookie("token");
  res.clearCookie("username");
  // You may also clear the token from other client-side storage mechanisms
  res.json({ message: "Logged out successfully" });
});

module.exports=router;
