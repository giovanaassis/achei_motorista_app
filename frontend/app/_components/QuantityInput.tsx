"use client";

import { DriverType } from "@/@types/driver";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface QuantityInputProps {
  seats?: number;
  onChangeDriver: (name: keyof DriverType, value: number) => void;
}

function QuantityInput({ seats, onChangeDriver }: QuantityInputProps) {
  const [numberSeats, setNumberSeats] = useState<number | undefined>(seats);

  const increaseSeats = (isIncreasing: boolean) => {
    if (numberSeats === undefined) {
      setNumberSeats(2);
    } else if (isIncreasing) {
      setNumberSeats(numberSeats + 1);
    } else {
      setNumberSeats(numberSeats > 2 ? numberSeats - 1 : undefined);
    }
  };

  useEffect(() => {
    onChangeDriver("vehicle_seats", numberSeats!);
  }, [numberSeats, onChangeDriver]);

  return (
    <div className="flex gap-x-5 mt-5 items-center">
      <MinusIcon className="icons" onClick={() => increaseSeats(false)} />
      <span
        id="number-seats"
        className="text-2xl font-bold text-black select-none"
      >
        {numberSeats ?? 2}
      </span>
      <PlusIcon className="icons" onClick={() => increaseSeats(true)} />
    </div>
  );
}

export default QuantityInput;
