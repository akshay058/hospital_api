const Patient = require("../models/patient");
const Report = require("../models/report");

const asyncHandler = require("express-async-handler");

// PATIENTS REGISTERATION ........
const patientRegister = asyncHandler(async (req, res) => {
  const { name, phone } = req.body;
  //   console.log("user id", req.user.id);
  //   console.log("name  phone", name, phone);
  if (!name || !phone) {
    res.status(400);
    throw new Error("please enter the name and phone");
  }

  const patientExsist = await Patient.findOne({ phone });

  if (patientExsist) {
    console.log("patient already Exist with this phone");
    res.status(200).json({
      _id: patientExsist.id,
      name: patientExsist.name,
      phone: patientExsist.phone,
    });
  } else {
    const patient = await Patient.create({
      name,
      phone,
      doctor: req.user.id,
    });
    if (patient) {
      res.status(200).json({
        _id: patient.id,
        name: patient.name,
        phone: patient.phone,
        doctor: patient.doctor,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Patient");
    }
  }
});

// Patient CREATE REPORT......
const patientCreateReport = asyncHandler(async (req, res) => {
  const { status } = req.body;
  //   console.log("status", status);
  if (!status) {
    res.status(400);
    throw new Error("please enter the status");
  }

  const patientExsist = await Patient.findById(req.params.id);
  //   console.log("patientsDoctor", req.params.id);
  //   console.log("patientsExist", patientExsist);

  if (patientExsist) {
    let newReport = await Report.create({
      created_by: patientExsist.doctor,
      status: req.body.status,
      date: Date(),
    });

    patientExsist.report.push(newReport);
    patientExsist.save();

    res.status(200).json({
      _id: newReport._id,
      Created_By: newReport.created_by,
      Status: newReport.status,
      Date: newReport.date,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Patient");
  }
});

// Patients ALL REPORTS...........
const patientAllReports = asyncHandler(async (req, res) => {
  const patientExsist = await Patient.findById(req.params.id);

  if (patientExsist) {
    let patientData = await Patient.findById(req.params.id).populate("report");

    res.status(200).json(patientData.report);
  } else {
    res.status(400);
    throw new Error("Invalid Patient");
  }
});

module.exports = {
  patientRegister,
  patientCreateReport,
  patientAllReports,
};
