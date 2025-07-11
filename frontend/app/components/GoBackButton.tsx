import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";

function GoBackButton() {
  return (
    <Link href={"/search"}>
      <button className="bg-transparent text-black-primary hover:opacity-70">
        <ArrowLeftCircle size={40}/>
      </button>
    </Link>
  );
}

export default GoBackButton;
