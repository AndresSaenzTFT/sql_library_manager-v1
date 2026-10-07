const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.redirect("/books");
});
//handler for the call to the functions

module.exports = router;
