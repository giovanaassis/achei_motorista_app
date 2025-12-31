import { Loader2 } from "lucide-react";

function Spinner() {
  return (
    <div className="flex h-[60vh] items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin origin-center text-black-primary block [transform-box:fill-box]" />
    </div>
  );
}

export default Spinner;
