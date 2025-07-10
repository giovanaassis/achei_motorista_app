import { IoLogoWhatsapp, IoLogoInstagram  } from "react-icons/io";
import { CgWebsite } from "react-icons/cg";
import DriverInfo from "@/app/components/DriverInfo";

export default function ProfilePage() {
    return (
        <section className="flex pl-10 w-[80%] py-10 text-2xl text-black-primary">
            {/* DRIVER INFO */}
            <DriverInfo />

            {/* DRIVER CONTACT */}
            <div className="pl-30">
                <p className="mb-10">Entre em contato:</p>
                <div className="flex flex-col gap-8 mb-10">
                    <div className="flex gap-5 items-center">
                        <IoLogoWhatsapp size={40}/>
                        <span>(21) 90837 - 1527</span>
                    </div>
                    <div className="flex gap-5 items-center">
                        <CgWebsite size={40}/>
                        <span>robertosilva.com</span>
                    </div>
                    <div className="flex gap-5 items-center">
                        <IoLogoInstagram size={40}/>
                        <span>@seu_uber_pessoal</span>
                    </div>
                </div>

                <button>agenda sua viagem agora</button>
            </div>
        </section>
    )
}