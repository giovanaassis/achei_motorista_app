import { MinusIcon, PlusIcon } from "lucide-react";

function QuantityInput() {
  return (
    <div className="flex gap-x-5 mt-5 items-center">
      <MinusIcon className="icons" />
      <span id="number-seats" className="text-2xl font-bold text-black">
        2
      </span>
      <PlusIcon className="icons" />
    </div>
  );
}

export default QuantityInput;
