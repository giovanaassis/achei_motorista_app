"use client";

import { DriverType } from "@/@types/driver";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface QuantityInputProps {
  seats?: number;
  onChangeDriver: (name: keyof DriverType, value: number) => void;
}

function QuantityInput({ seats, onChangeDriver }: QuantityInputProps) {
  const [numberSeats, setNumberSeats] = useState<number>(seats || 2);

  const increaseSeats = (isIncreasing: boolean) => {
    if (isIncreasing) {
      setNumberSeats((prev) => prev + 1);
    } else {
      setNumberSeats((prev) => (prev > 2 ? prev - 1 : prev));
    }
  };

  useEffect(() => {
    onChangeDriver("vehicle_seats", numberSeats);
  }, [numberSeats, onChangeDriver]);

  return (
    <div className="flex gap-x-5 mt-5 items-center">
      <MinusIcon className="icons" onClick={() => increaseSeats(false)} />
      <span
        id="number-seats"
        className="text-2xl font-bold text-black select-none"
      >
        {numberSeats}
      </span>
      <PlusIcon className="icons" onClick={() => increaseSeats(true)} />
    </div>
  );
}

export default QuantityInput;
