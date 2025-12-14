"use server";

import { SocialType } from "@/app/@types/social";
import { createSocials, updateSocials } from "./social";
import { http } from "../api/http";
import { getErrorMessage } from "@/app/_utils/getErrorMessage";

export async function createDriver(formData: FormData) {
  const rawData = Object.fromEntries(formData);
  const driver_availability = formData.getAll("driver_availability");
  const { instagram, facebook, site, ...driver } = rawData;
  const payload = { ...driver, driver_availability };

  // CREATE DRIVER
  const res = await http("drivers", "POST", payload);
  if (!res.ok) {
    return { success: false, message: getErrorMessage(res.status) };
  }

  const createdDriver = await res.json();
  const documentId = createdDriver.data.documentId;

  // CREATE SOCIALS
  const socials: SocialType[] = [];
  if (instagram)
    socials.push({
      social: "instagram",
      url: String(instagram),
      driver: documentId,
    });
  if (facebook)
    socials.push({
      social: "facebook",
      url: String(facebook),
      driver: documentId,
    });
  if (site)
    socials.push({
      social: "site",
      url: String(site),
      driver: documentId,
    });

  if (socials.length > 0) {
    const socialsRes = await createSocials(socials);
    if (!socialsRes.success) {
      return {
        success: false,
        message: "Houve um erro com suas redes socias.",
      };
    }
  }

  return {
    success: true,
    driverId: createdDriver.data.id,
    message: "Atualizado com sucesso",
  };
}

export async function updateDriver(formData: FormData) {
  const rawData = Object.fromEntries(formData);
  const driver_availability = formData.getAll("driver_availability");
  const { instagram, facebook, site, documentId, ...driver } = rawData;
  const payload = { ...driver, driver_availability };

  // UPDATE DRIVER
  const res = await http(`drivers/${documentId}`, "PUT", payload);

  if (!res.ok) {
    return { success: false, message: getErrorMessage(res.status) };
  }

  // UPDATE SOCIALS
  if (instagram) {
    const instaRes = await updateSocials(
      "instagram",
      instagram.toString(),
      documentId.toString()
    );
    if (!instaRes?.success) {
      return {
        success: false,
        message: "Houve um erro com suas redes sociais",
      };
    }
  }
  if (facebook) {
    const faceRes = await updateSocials(
      "facebook",
      facebook.toString(),
      documentId.toString()
    );
    if (!faceRes?.success) {
      return {
        success: false,
        message: "Houve um erro com suas redes sociais",
      };
    }
  }
  if (site) {
    const siteRes = await updateSocials(
      "site",
      site.toString(),
      documentId.toString()
    );
    if (!siteRes?.success) {
      return {
        success: false,
        message: "Houve um erro com suas redes sociais",
      };
    }
  }

  const updatedDriver = await res.json();

  return {
    success: true,
    driverId: updatedDriver.data.id,
    message: "Atualizado com sucesso",
  };
}
