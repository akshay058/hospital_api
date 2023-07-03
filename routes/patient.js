const express = require("express");
const {
  patientRegister,
  patientCreateReport,
  patientAllReports,
} = require("../controller/patientController");

const { Authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

// router.use(verifyToken);

router.post("/register", Authenticate, patientRegister);

// patient id
router.post("/:id/create_report", Authenticate, patientCreateReport);

// patient id
router.get("/:id/all_reports", Authenticate, patientAllReports);

module.exports = router;
