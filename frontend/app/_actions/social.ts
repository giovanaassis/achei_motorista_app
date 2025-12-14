"use server";

import { SocialType } from "@/@types/social";
import { http } from "../api/http";

export async function updateSocials(social: string, url: string, id: string) {
  try {
    // CHECK IF IT EXISTS
    const res = await http(
      `driver-socials?filters[social][$eq]=${social}&filters[driver][documentId][$eq]=${id}&populate=*`,
      "GET"
    );

    if (!res.ok) {
      return { success: false };
    }

    // SOCIAL ALREADY EXISTS
    const existed = await res.json();
    if (existed.data.length > 0) {
      if (existed.data[0].url === url) {
        return { success: true };
      }

      // TO UPDATE NEW SOCIAL
      const res2 = await http(
        `driver-socials/${existed.data[0].documentId}`,
        "PUT",
        { data: { url } }
      );
      if (!res2.ok) {
        return { success: false };
      }
    }

    // SOCIAL DOESN'T EXIST - CREATE NEW
    const res3 = await http("driver-socials", "POST", {
      data: { social, url, driver: id },
    });

    if (!res3.ok) {
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.log(error);
  }
}

export async function createSocials(socials: SocialType[]) {
  try {
    const results = await Promise.all(
      socials.map(async (social) => {
        const res = await http("driver-socials", "POST", { data: social });
        if (!res.ok) {
          return;
        }

        const data = await res.json();
        return data;
      })
    );

    if (results.some((res) => res === undefined)) {
      return { success: false };
    } else {
      return { success: true };
    }
  } catch (error) {
    console.error("Error at updateSocials:", error);
    throw error;
  }
}

export async function deleteSocials(documentId?: string) {
  const res = await http(`driver-socials/${documentId}`, "DELETE");

  return res;
}
