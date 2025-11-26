import { cookies } from "next/headers";
import Navbar from "./Navbar";

async function Header() {
  const session = (await cookies()).get("token")?.value;

  return <Navbar userLogged={!!session} />;
}

export default Header;
