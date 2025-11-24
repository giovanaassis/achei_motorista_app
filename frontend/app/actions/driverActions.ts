"use server";

import { SocialType } from "@/@types/social";
import { API_URL } from "../axios/config";
import { createSocials, updateSocials } from "./socialActions";

export async function createDriver(formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData);
    const driver_availability = formData.getAll("driver_availability");
    const { instagram, facebook, site, ...driver } = rawData;
    const payload = { ...driver, driver_availability };

    // CREATE DRIVER
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
        driver: createdDriver.data.documentId,
      });
    if (facebook)
      socials.push({
        social: "facebook",
        url: String(facebook),
        driver: createdDriver.data.documentId,
      });
    if (site)
      socials.push({
        social: "site",
        url: String(site),
        driver: createdDriver.data.documentId,
      });

    if (socials.length > 0) {
      createSocials(socials);
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

    // UPDATE DRIVER
    const res = await fetch(`${API_URL}/drivers/${driverId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error();
    }

    // UPDATE SOCIALS
    if (instagram) {
      await updateSocials(
        "instagram",
        instagram.toString(),
        driverId.toString()
      );
    }
    if (facebook) {
      await updateSocials("facebook", facebook.toString(), driverId.toString());
    }
    if (site) {
      await updateSocials("site", site.toString(), driverId.toString());
    }

    return { success: true };
  } catch (error) {
    console.log("Error at updating driver: ", error);
    return { success: false };
  }
}
