"use client";

import { FaCarSide } from "react-icons/fa";
import { FaMotorcycle } from "react-icons/fa";
import QuantityInput from "@/app/components/QuantityInput";
import { DriverType } from "@/app/types/driver";
import { ChangeEvent, useState } from "react";

const daysWeek = [
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
  "domingo",
];

function VehicleForm({ driver }: { driver?: DriverType }) {
  const [availability, setAvailability] = useState<string[]>(
    driver?.driver_availability || []
  );
  const [vehicle, setVehicle] = useState<string | undefined>(
    driver?.vehicle_type
  );

  const handleAvailabilityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    let next: string[];

    if (checked) {
      if (!availability.some((a) => a === value)) {
        next = [...availability, value];
      } else {
        next = availability;
      }
    } else {
      next = availability.filter((a) => a !== value);
    }

    setAvailability(next);
  };

  return (
    <>
      <p className="self-start text-2xl my-5">Tipo de veículo</p>
      <div className="self-start flex gap-15">
        <label htmlFor="car">
          <input
            type="radio"
            name="vehicle_type"
            id="car"
            className="peer hidden"
            checked={vehicle === "carro"}
            value="carro"
            onChange={(e) => setVehicle(e.target.value)}
          />
          <div className="vehicle-input">
            <FaCarSide />
            <span>Carro</span>
          </div>
        </label>

        <label htmlFor="motocycle">
          <input
            type="radio"
            name="vehicle_type"
            id="motocycle"
            className="peer hidden"
            checked={vehicle === "moto"}
            value="moto"
            onChange={(e) => setVehicle(e.target.value)}
          />
          <div className="vehicle-input">
            <FaMotorcycle />
            <span>Moto</span>
          </div>
        </label>
      </div>

      {vehicle === "carro" && (
        <div className="self-start mb-5">
          <p className="text-2xl">Quantidade de assentos no carro</p>
          <QuantityInput seats={driver?.vehicle_seats} />
        </div>
      )}

      <p className="self-start text-2xl mb-5 select-none">Disponibilidade</p>
      <div className="self-start flex gap-4 flex-wrap">
        {daysWeek.map((day) => (
          <label htmlFor={day} key={day}>
            <input
              type="checkbox"
              name="driver_availability"
              id={day}
              className="peer hidden"
              value={day}
              onChange={handleAvailabilityChange}
              checked={availability.some((a) => a === day)}
            />
            <span className="availability-input">{day}</span>
          </label>
        ))}
      </div>
    </>
  );
}

export default VehicleForm;
