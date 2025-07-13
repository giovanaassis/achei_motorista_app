import { FaCarSide } from "react-icons/fa";
import { FaMotorcycle } from "react-icons/fa";
import QuantityInput from "./QuantityInput";

const daysWeek = [
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
  "domingo",
];

function VehicleForm() {
  return (
    <>
      <p className="self-start text-3xl">Tipo de veículo</p>
      <div className="self-start flex gap-15">
        <label htmlFor="car">
          <input
            type="radio"
            name="driver-vehicle"
            id="car"
            className="peer hidden"
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
          />
          <div className="vehicle-input">
            <FaMotorcycle />
            <span>Moto</span>
          </div>
        </label>
      </div>

      <div className="self-start">
        <p className="text-3xl">Quantidade de assentos no carro</p>
        <QuantityInput />
      </div>

      <p className="self-start text-3xl">Disponibilidade</p>
      <div className="self-start flex gap-4 flex-wrap">
        {daysWeek.map((day) => (
          <label htmlFor={day} key={day}>
            <input
              type="checkbox"
              name="driver-availability"
              id={day}
              className="peer hidden"
            />
            <span className="availability-input">{day}</span>
          </label>
        ))}
      </div>
    </>
  );
}

export default VehicleForm;
