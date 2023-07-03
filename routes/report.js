const express = require("express");
const { statusReports } = require("../controller/reportController");

const router = express.Router();

// const { verifyToken } = require("../middleware/authMiddleware");

router.get("/:status", statusReports);

module.exports = router;
