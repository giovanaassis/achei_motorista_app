import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

function GoBackButton() {
  return (
    <Link href={"/search"}>
      <button className="hover:opacity-70 rounded-full bg-black-primary text-white">
        <ArrowLeftIcon size={35}/>
      </button>
    </Link>
  );
}

export default GoBackButton;
