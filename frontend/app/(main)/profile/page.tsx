import { IoLogoWhatsapp, IoLogoInstagram  } from "react-icons/io";
import { CgWebsite } from "react-icons/cg";
import DriverInfo from "@/app/components/DriverInfo";

export default function ProfilePage() {
    return (
        <section className="flex pl-10 w-[80%] py-10 justify-between text-2xl">
            {/* DRIVER INFO */}
            <DriverInfo />

            {/* DRIVER CONTACT */}
            <div>
                <p>Entre em contato:</p>
                <div>
                    <IoLogoWhatsapp />
                    <span>(21) 90837 - 1527</span>
                </div>
                <div>
                    <CgWebsite />
                    <span>robertosilva.com</span>
                </div>
                <div>
                    <IoLogoInstagram  />
                    <span>@seu_uber_pessoal</span>
                </div>

                <button>agenda sua viagem agora</button>
            </div>
        </section>
    )
}