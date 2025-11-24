"use server";

import { SocialType } from "@/@types/social";
import { API_URL } from "../axios/config";

export async function updateSocials(social: string, url: string, id: string) {
  try {
    // CHECK IF IT EXISTS
    const res = await fetch(
      `${API_URL}/driver-socials?filters[social][$eq]=${social}&filters[driver][documentId][$eq]=${id}&populate=*`,
      {
        headers: { Authorization: `Bearer ${process.env.API_KEY}` },
      }
    );

    // SOCIAL ALREADY EXISTS
    const existed = await res.json();
    if (existed.data.length > 0) {
      if (existed.data[0].url === url) {
        return;
      }

      // TO UPDATE NEW SOCIAL
      const res2 = await fetch(
        `${API_URL}/driver-socials/${existed.data[0].documentId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify({ data: { url } }),
        }
      );
      return res2;
    }

    // SOCIAL DOESN'T EXIST - CREATE NEW
    const res3 = await fetch(`${API_URL}/driver-socials`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: { social, url, driver: id } }),
    });

    return res3;
  } catch (error) {
    console.log(error);
  }
}

export async function createSocials(socials: SocialType[]) {
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
