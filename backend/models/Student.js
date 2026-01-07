// models/Student.js
const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  rollNo: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  subjects: [
    {
      name: { type: String, required: true },
      mseMarks: { type: Number, required: true },
      eseMarks: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Student", StudentSchema);
