import axios from "axios";
import { API_URL } from "../axios/config";
import { DriverType } from "@/@types/driver";
import { AvailabilityType } from "@/@types/availability";

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

  const { driver_socials, driver_availability, ...driverData } = driver;

  if (driver_socials && driver_socials?.length > 0) {
    updateDriverSocials(driver_socials, driverData.documentId);
  }

  try {
    let availabilitiesId: number[] | undefined = [];
    if (driver_availability) {
      availabilitiesId = await updateDriverAvailability(
        driver_availability,
        token
      );
    }

    console.log(driverData);

    const res = await axios.put(
      `${API_URL}/drivers/${driver.documentId}`,
      {
        data: { ...driverData, driver_availability: { set: availabilitiesId } },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log("Error at service updateDriver: ", error);
  }
};

type TSocial = {
  documentId?: number;
  social: "instagram" | "facebook" | "site";
  url: string;
  driver?: number;
};

export const updateDriverSocials = async (
  socials: TSocial[],
  driverId: number
) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  const validSocials = socials?.filter((s) => s.documentId);
  if (validSocials && validSocials?.length > 0) return;

  try {
    // GETTING AND DELETING THE EXISTING SOCIALS
    const { data } = await axios.get(
      `${API_URL}/driver-socials?filters[driver][documentId][$eq]=${driverId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const oldSocials = data?.data || [];

    await Promise.all(
      oldSocials.map((social: TSocial) =>
        axios.delete(`${API_URL}/driver-socials/${social.documentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
    );

    // CREATING NEW SOCIALS
    const res = await Promise.all(
      socials.map((social) =>
        axios.post(
          `${API_URL}/driver-socials`,
          {
            data: {
              ...social,
              driver: driverId,
            },
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      )
    );

    return res;
  } catch (error) {
    console.log("Error at service updateDriverSocials:", error);
  }
};

export const updateDriverAvailability = async (
  availability: AvailabilityType[],
  token: string
) => {
  try {
    const query = availability
      .map((day) => `filters[name][$in]=${day.name}`)
      .join("&");

    const res = await axios.get(
      `${API_URL}/calendar-days?fields[0]=id&${query}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const ids = (res.data.data as { id: number }[]).map((a) => a.id);
    return ids;
  } catch (error) {
    console.log("Error at updateDriverAvailability: ", error);
  }
};
