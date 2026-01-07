const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const studentRoutes = require("./routes/Students");
app.use("/api/students", studentRoutes);

const server = app
  .listen(PORT, () => {
    console.log(`Server running on port ${server.address().port}`);
  })
  .on("error", (e) => {
    if (e.code === "EADDRINUSE") {
      console.log("Port is busy, trying the next one...");
      server.listen(0); // This will automatically find an available port
    } else {
      console.error(e);
    }
  });
