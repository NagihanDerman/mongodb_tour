const express = require("express");

const router = express.Router();

// ---- routes -----
router.route("/")
.get((req, res) => {})
.post((req, res) => {});


router.route("/:id")
.get(() => {})
.delete(() => {})
.patch(() => {});

module.exports = router;