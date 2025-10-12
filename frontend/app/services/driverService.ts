import axios from "axios";
import { API_URL } from "../axios/config";
import { DriverType } from "@/@types/driver";

export const getDriver = async (
  userId: number,
  update: (driver: DriverType) => void
) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await axios.get(
      `${API_URL}/drivers?filters[user][id][$eq]=${userId}&populate=*`
    );
    if (res) {
      const driver = res.data.data[0];
      driver.state_id = driver.state_id.id;
      driver.city_id = driver.city_id.id;
      update(driver);
      return driver;
    }

    return;
  } catch (error) {
    console.log("Error at service getDriver: ", error);
  }
};

export const createDriver = async (
  userId: number,
  update: (driver: DriverType) => void
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
      update(driver);
      return driver;
    }

    return;
  } catch (error) {
    console.log("Error at service createDriver: ", error);
  }
};

export const updateDriver = async (driver: DriverType) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await axios.put(
      `${API_URL}/drivers/${driver.documentId}`,
      driver,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log("Error at service updateDriver: ", error);
  }
};
