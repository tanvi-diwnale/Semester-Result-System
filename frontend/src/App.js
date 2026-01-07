import React, { useState } from "react";
import { addStudent, getStudent } from "./services/api";

const subjects = [
  "DAA",
  "Operating System",
  "Computer Networks",
  "Database Management",
];

const ResultDashboard = () => {
  const [studentInfo, setStudentInfo] = useState({
    rollNo: "",
    name: "",
    surname: "",
  });

  const [marks, setMarks] = useState({
    DAA: { mse: "", ese: "" },
    "Operating System": { mse: "", ese: "" },
    "Computer Networks": { mse: "", ese: "" },
    "Database Management": { mse: "", ese: "" },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInfoChange = (e) => {
    setStudentInfo({ ...studentInfo, [e.target.name]: e.target.value });
  };

  const handleMarksChange = (subject, examType, value) => {
    setMarks({
      ...marks,
      [subject]: { ...marks[subject], [examType]: value },
    });
  };

  const calculateTotal = (mse, ese) => {
    const mseMark = parseFloat(mse) || 0;
    const eseMark = parseFloat(ese) || 0;
    return (mseMark * 0.3 + eseMark * 0.7).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const studentData = {
        ...studentInfo,
        subjects: Object.entries(marks).map(([name, { mse, ese }]) => ({
          name,
          mseMarks: parseFloat(mse),
          eseMarks: parseFloat(ese),
        })),
      };

      await addStudent(studentData);
      setSuccess("Student data submitted successfully!");
      // Clear form or update state as needed
    } catch (err) {
      setError(err.message || "An error occurred while submitting data");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const student = await getStudent(studentInfo.rollNo);
      setStudentInfo({
        name: student.name,
        surname: student.surname,
        rollNo: student.rollNo,
      });
      const newMarks = {};
      student.subjects.forEach((subject) => {
        newMarks[subject.name] = {
          mse: subject.mseMarks.toString(),
          ese: subject.eseMarks.toString(),
        };
      });
      setMarks(newMarks);
      setSuccess("Student data retrieved successfully!");
    } catch (err) {
      setError(err.message || "An error occurred while fetching student data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container"
      style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}
    >
      <div
        className="card"
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        <h1
          style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
        >
          VIT Student Result Dashboard
        </h1>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <input
              name="rollNo"
              placeholder="Roll No."
              value={studentInfo.rollNo}
              onChange={handleInfoChange}
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
            <input
              name="name"
              placeholder="Name"
              value={studentInfo.name}
              onChange={handleInfoChange}
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
            <input
              name="surname"
              placeholder="Surname"
              value={studentInfo.surname}
              onChange={handleInfoChange}
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
          </div>

          <button
            type="button"
            onClick={handleSearch}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              marginBottom: "20px",
              cursor: "pointer",
            }}
          >
            Search Student
          </button>

          {subjects.map((subject) => (
            <div key={subject} style={{ marginBottom: "20px" }}>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "semibold",
                  marginBottom: "10px",
                }}
              >
                {subject}
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                <input
                  placeholder="MSE Marks"
                  value={marks[subject].mse}
                  onChange={(e) =>
                    handleMarksChange(subject, "mse", e.target.value)
                  }
                  style={{
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
                />
                <input
                  placeholder="ESE Marks"
                  value={marks[subject].ese}
                  onChange={(e) =>
                    handleMarksChange(subject, "ese", e.target.value)
                  }
                  style={{
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
                />
              </div>
              <p style={{ marginTop: "10px" }}>
                Total: {calculateTotal(marks[subject].mse, marks[subject].ese)}
              </p>
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px 20px",
              backgroundColor: "#008CBA",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {loading ? "Submitting..." : "Add Marks"}
          </button>
        </form>

        {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}
        {success && (
          <p style={{ color: "green", marginTop: "20px" }}>{success}</p>
        )}
      </div>
    </div>
  );
};

export default ResultDashboard;
