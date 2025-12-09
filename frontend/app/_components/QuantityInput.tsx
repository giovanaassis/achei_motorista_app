"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface QuantityInputProps {
  seats?: number;
  onChangeSeats?: (value: number) => void;
}

function QuantityInput({ seats, onChangeSeats }: QuantityInputProps) {
  const [numberSeats, setNumberSeats] = useState<number>(seats ?? 2);

  useEffect(() => {
    setNumberSeats(seats ?? 2);
  }, [seats]);

  const handleSeats = (isIncreasing: boolean) => {
    const next = isIncreasing ? numberSeats + 1 : Math.max(2, numberSeats - 1);

    setNumberSeats(next);
    onChangeSeats?.(next);
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
