const mongoose = require("mongoose");

// mongoose connection set up...
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connection Established");
  } catch (error) {
    onsole.log(error);
    process.exit(1);
  }
};
module.exports = connectDB;
