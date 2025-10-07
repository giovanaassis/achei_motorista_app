import axios from "axios";
import { API_URL } from "../axios/config";
import { DriverType } from "@/@types/driver";

export const getDriver = async (
  userId: number,
  updateDriver: (driver: DriverType) => void
) => {
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
    if (res) {
      const driver = res.data.data;
      updateDriver(driver);
      return driver;
    }

    return;
  } catch (error) {
    console.log("Error at service getDriver: ", error);
  }
};

export const createDriver = async (
  userId: number,
  updateDriver: (driver: DriverType) => void
) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await axios.post(
      `${API_URL}/drivers`,
      { data: { user: userId } },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res) {
      const driver = res.data.data;
      updateDriver(driver);
      return driver;
    }

    return;
  } catch (error) {
    console.log("Error at service createDriver: ", error);
  }
};
