import { IoLogoInstagram, IoLogoFacebook } from "react-icons/io";
import { CgWebsite } from "react-icons/cg";
import { DriverType } from "@/app/@types/driver";
import WhatsappButton from "../../_components/WhatsappButton";
import DriverInfo from "../../_components/DriverInfo";
import { http } from "@/app/api/http";
import { getErrorMessage } from "@/app/_utils/getErrorMessage";
import { cookies } from "next/headers";
import { API_URL } from "@/app/config/env";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  const res = await http(
    `drivers?filters[id][$eq]=${id}&populate[0]=user&populate[1]=driver_socials`,
    "GET"
  );

  if (!res.ok) {
    return <span>{getErrorMessage(res.status)}</span>;
  }

  const data = await res.json();
  const driver: DriverType = data.data[0];

  // CHECK IF IT IS THE AUTHENTICATED USER
  let isOwner: boolean = false;
  const token = (await cookies()).get("token")?.value;
  if (token) {
    const res2 = await fetch(`${API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res2.ok) {
      return <span>{getErrorMessage(res2.status)}</span>;
    }

    const data2 = await res2.json();
    const userAuthenticated = data2;
    if (driver.user.id === userAuthenticated?.id) {
      isOwner = true;
    }
  }

  const facebook = driver?.driver_socials?.find(
    (s) => s.social === "facebook"
  )?.url;
  const instagram = driver?.driver_socials?.find(
    (s) => s.social === "instagram"
  )?.url;
  const site = driver?.driver_socials?.find((s) => s.social === "site")?.url;

  if (!driver) {
    return <p>Buscando dados do motorista.</p>;
  }

  return (
    <section className="flex flex-col items-center justify-center py-10 text-2xl text-black-primary lg:flex-row lg:justify-around lg:items-start">
      {/* DRIVER INFO */}
      <DriverInfo driver={driver} isOwner={isOwner} />

      {/* DRIVER CONTACT */}
      <div className="flex flex-col items-center mt-15 lg:items-start lg:mt-0">
        <p className="mb-10">Entre em contato:</p>
        <div className="flex flex-col gap-8 mb-10">
          <div className="flex gap-5 items-center">
            <IoLogoFacebook size={40} color="darkblue" />
            <a href={facebook || ""} target="_blank" rel="noopener noreferrer">
              {facebook ? "Ver facebook" : "Não tem facebook"}
            </a>
          </div>

          <div className="flex gap-5 items-center">
            <CgWebsite size={40} color="green" />
            <a
              href={site ? site : ""}
              target="_blank"
              rel="noopener noreferrer"
            >
              {site ? `Site de ${driver.user.name}` : "Não tem site"}
            </a>
          </div>
          <div className="flex gap-5 items-center">
            <IoLogoInstagram size={40} color="purple" />
            <a
              href={instagram ? `https://instagram.com/${instagram}` : ""}
              target="_blank"
              rel="noopener noreferrer"
            >
              {instagram || "Não tem instagram."}
            </a>
          </div>
        </div>

        <WhatsappButton phone_number={driver.phone_number} />
      </div>
    </section>
  );
}
