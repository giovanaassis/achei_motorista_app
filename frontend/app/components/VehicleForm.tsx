"use client";

import { FaCarSide } from "react-icons/fa";
import { FaMotorcycle } from "react-icons/fa";
import QuantityInput from "./QuantityInput";
import { DriverType } from "@/@types/driver";
import { ChangeEvent, useEffect, useState } from "react";
import React from "react";
import { AvailabilityType } from "@/@types/availability";

const daysWeek = [
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
  "domingo",
];

interface VehicleFormProps {
  driver: DriverType | null;
  onChangeDriver: (
    name: keyof DriverType,
    value: string | AvailabilityType[] | number
  ) => void;
}

function VehicleForm({ driver, onChangeDriver }: VehicleFormProps) {
  const [availability, setAvailability] = useState<AvailabilityType[]>(
    driver?.driver_availability || []
  );

  const handleAvailabilityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setAvailability((prev) => {
      if (checked) {
        if (!prev.some((a) => a.name === value)) {
          return [...prev, { name: value }];
        }
        return prev;
      } else {
        return prev.filter((a) => a.name !== value);
      }
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChangeDriver("driver_availability", availability);
    }, 300);

    return () => clearTimeout(timeout);
  }, [availability, onChangeDriver]);

  useEffect(() => {
    if (driver?.driver_availability) {
      setAvailability(driver.driver_availability);
    }
  }, [driver?.driver_availability]);

  return (
    <>
      <p className="self-start text-2xl my-5">Tipo de veículo</p>
      <div className="self-start flex gap-15">
        <label htmlFor="car">
          <input
            type="radio"
            name="driver-vehicle"
            id="car"
            className="peer hidden"
            checked={driver?.vehicle_type === "carro"}
            onChange={() => onChangeDriver("vehicle_type", "carro")}
          />
          <div className="vehicle-input">
            <FaCarSide />
            <span>Carro</span>
          </div>
        </label>

        <label htmlFor="motocycle">
          <input
            type="radio"
            name="driver-vehicle"
            id="motocycle"
            className="peer hidden"
            checked={driver?.vehicle_type === "moto"}
            onChange={() => onChangeDriver("vehicle_type", "moto")}
          />
          <div className="vehicle-input">
            <FaMotorcycle />
            <span>Moto</span>
          </div>
        </label>
      </div>

      {driver?.vehicle_type === "carro" && (
        <div className="self-start mb-5">
          <p className="text-2xl">Quantidade de assentos no carro</p>
          <QuantityInput
            seats={driver?.vehicle_seats}
            onChangeDriver={onChangeDriver}
          />
        </div>
      )}

      <p className="self-start text-2xl mb-5 select-none">Disponibilidade</p>
      <div className="self-start flex gap-4 flex-wrap">
        {daysWeek.map((day) => (
          <label htmlFor={day} key={day}>
            <input
              type="checkbox"
              name="driver-availability"
              id={day}
              className="peer hidden"
              value={day}
              onChange={handleAvailabilityChange}
              checked={availability.some((a) => a.name === day)}
            />
            <span className="availability-input">{day}</span>
          </label>
        ))}
      </div>
    </>
  );
}

export default React.memo(VehicleForm);
