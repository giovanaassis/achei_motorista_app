"use server";

import { SocialType } from "@/@types/social";
import { API_URL } from "../axios/config";

export async function createDriver(formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData);
    const driver_availability = formData.getAll("driver_availability");
    const { instagram, facebook, site, ...driver } = rawData;
    const payload = { ...driver, driver_availability };

    // CREATES DRIVER
    const res = await fetch(`${API_URL}/drivers`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const createdDriver = await res.json();

    // VALIDATE ERRORS
    if (createdDriver.error) {
      const { status, details } = createdDriver.error;
      console.log(`Error ${status}`, details);
      return { message: "Deu erro" };
    }

    // CREATE SOCIALS
    const socials: SocialType[] = [];
    if (instagram)
      socials.push({
        social: "instagram",
        url: String(instagram),
        driver: "n852z15qvbwx2i7hptqhby3f",
      });
    if (facebook)
      socials.push({
        social: "facebook",
        url: String(facebook),
        driver: "n852z15qvbwx2i7hptqhby3f",
      });
    if (site)
      socials.push({
        social: "site",
        url: String(site),
        driver: "n852z15qvbwx2i7hptqhby3f",
      });

    if (socials.length > 0) {
      updateSocials(socials);
    }

    return { success: true };
  } catch (error) {
    console.log("Error at creating driver: ", error);
    return { success: false };
  }
}

export async function updateDriver(formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData);
    const driver_availability = formData.getAll("driver_availability");
    const { instagram, facebook, site, driverId, ...driver } = rawData;
    const payload = { ...driver, driver_availability };
    console.log("rawdata", rawData);

    // const res = await fetch(`${API_URL}/drivers/${driverId}`, {
    //   method: "PUT",
    //   headers: {
    //     Authorization: `Bearer ${process.env.API_KEY}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(payload),
    // });

    // if (!res.ok) {
    //   throw new Error();
    // }

    return { success: true };
  } catch (error) {
    console.log("Error at updating driver: ", error);
    return { success: false };
  }
}

export async function updateSocials(socials: SocialType[]) {
  try {
    const results = await Promise.all(
      socials.map(async (social) => {
        const res = await fetch(`${API_URL}/driver-socials`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: social }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            `Erro ao criar social ${social.social}: ${JSON.stringify(data)}`
          );
        }

        return data;
      })
    );

    return results;
  } catch (error) {
    console.error("Error at updateSocials:", error);
    throw error;
  }
}
