// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const addStudent = async (studentData) => {
  try {
    const response = await axios.post(`${API_URL}/students/add`, studentData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getStudent = async (rollNo) => {
  try {
    const response = await axios.get(`${API_URL}/students/${rollNo}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
