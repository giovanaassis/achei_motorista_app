"use client";

import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../axios/config";

type InputType = {
  id: number;
  name: string;
};

interface LocaleInputProps {
  hasState: boolean;
  selectedState: string;
  setSelectedState: (state: string) => void;
  setSelectedCity?: (city: string) => void;
}

function LocaleInput({
  hasState,
  selectedState,
  setSelectedState,
  setSelectedCity,
}: LocaleInputProps) {
  const [states, setStates] = useState<InputType[]>();
  const [cities, setCities] = useState<InputType[]>();

  const handleChange = (value: string) => {
    if (hasState) {
      // CITY VALUE CHANGED
      setSelectedCity?.(value);
    } else {
      // STATE VALUE CHANGED
      setSelectedState(value);
    }
  };

  useEffect(() => {
    if (hasState) return;
    // GET STATES
    axios
      .get(`${API_URL}/states?sort=name&pagination[pageSize]=27&fields=name`)
      .then((res) => {
        const data = res.data.data;
        const statesList = data.map((state: InputType) => state);
        setStates(statesList);
      })
      .catch((err) => console.log(err));
  }, [hasState]);

  useEffect(() => {
    if (selectedState) {
      // GET CITIES
      axios
        .get(
          `${API_URL}/cities?sort=name&filters[state_id][$eq]=${selectedState}&pagination[limit]=100`
        )
        .then((res) => {
          const data = res.data.data;
          const citiesList = data.map((city: InputType) => city);
          setCities(citiesList);
        })
        .catch((err) => console.log(err));
    }
  }, [selectedState]);

  return (
    <div>
      <Select.Root onValueChange={handleChange}>
        <Select.Trigger
          placeholder={hasState ? "Sua cidade" : "Seu estado"}
          className="flex items-center justify-between gap-5 bg-white text-gray-secondary font-bold border-2 w-[280px] capitalize"
        />
        <Select.Content
          position="popper"
          className="input overflow-y-auto max-h-40"
        >
          {!hasState && states
            ? states.map((state) => (
                <Select.Item
                  key={state.id}
                  value={String(state.id)}
                  className="flex items-center gap-3 outline-0 cursor-pointer hover:bg-lightgray pl-2 text-xl"
                >
                  {state.name}
                </Select.Item>
              ))
            : cities?.map((city) => (
                <Select.Item
                  key={city.id}
                  value={city.name}
                  className="flex items-center gap-3 outline-0 cursor-pointer hover:bg-lightgray pl-2 text-xl"
                >
                  {city.name}
                </Select.Item>
              ))}
        </Select.Content>
      </Select.Root>
    </div>
  );
}

export default LocaleInput;
