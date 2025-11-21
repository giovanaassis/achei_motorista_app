"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

function QuantityInput({ seats }: { seats?: number }) {
  const [numberSeats, setNumberSeats] = useState<number>(seats || 2);

  const handleSeats = (isIncreasing: boolean) => {
    if (!isIncreasing && numberSeats > 2) {
      setNumberSeats((prev) => prev - 1);
    }
    if (isIncreasing) {
      setNumberSeats((prev) => prev + 1);
    }
  };

  return (
    <div className="flex gap-x-5 mt-5 items-center">
      <MinusIcon className="icons" onClick={() => handleSeats(false)} />
      <input hidden name="vehicle_seats" value={numberSeats} readOnly />
      <span
        id="number-seats"
        className="text-2xl font-bold text-black select-none"
      >
        {numberSeats}
      </span>
      <PlusIcon className="icons" onClick={() => handleSeats(true)} />
    </div>
  );
}

export default QuantityInput;
