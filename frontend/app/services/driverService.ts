import axios from "axios";
import { API_URL } from "../axios/config";

export const getDriver = async (userId: number) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await axios.get(
      `${API_URL}/drivers?filters[user][id][$eq]=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.data;
  } catch (error) {
    console.log("Error at service getDriver: ", error);
  }
};

export const createDriver = async (userId: number) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await axios.post(
      `${API_URL}/drivers`,
      { data: { user: userId } },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data.data;
  } catch (error) {
    console.log("Error at service createDriver: ", error);
  }
};
