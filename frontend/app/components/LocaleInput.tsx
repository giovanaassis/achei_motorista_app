"use client";

import { Select } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import states from "@/data/states.json";

interface LocaleInputProps {
  hasState: boolean;
  selectedState?: string;
  selectedCity?: string;
  setSelectedState?: (state: string) => void;
  setSelectedCity?: (city: string) => void;
}

function LocaleInput({
  hasState,
  selectedState,
  selectedCity,
  setSelectedState,
  setSelectedCity,
}: LocaleInputProps) {
  const [cities, setCities] = useState<string[]>();

  const handleChange = (value: string) => {
    if (hasState) {
      if (value !== selectedCity) setSelectedCity?.(value); // CITY VALUE CHANGED
    } else {
      if (value !== selectedState) {
        setSelectedState?.(value);
        setSelectedCity?.("");
      } // STATE VALUE CHANGED
    }
  };

  useEffect(() => {
    if (hasState) {
      if (selectedState) {
        const selectedCities =
          states.find((state) => state.state === selectedState)?.cities ?? [];
        setCities(selectedCities);
      } else {
        setCities([]);
      }
    }
  }, [hasState, selectedState]);

  const value = hasState ? selectedCity ?? "" : selectedState ?? "";

  return (
    <div>
      <Select.Root onValueChange={handleChange} value={value}>
        <Select.Trigger
          placeholder={hasState ? "Sua cidade" : "Seu estado"}
          className="flex items-center justify-between gap-5 bg-white text-gray-secondary font-bold border-2 w-[280px] capitalize"
        ></Select.Trigger>
        <Select.Content
          position="popper"
          className="input overflow-y-auto max-h-40"
        >
          {!hasState
            ? states.map((state) => (
                <Select.Item
                  key={state.id}
                  value={state.state}
                  className="flex items-center gap-3 outline-0 cursor-pointer hover:bg-lightgray pl-2 text-xl"
                >
                  {state.state}
                </Select.Item>
              ))
            : cities?.map((city, index) => (
                <Select.Item
                  key={index + 1}
                  value={city}
                  className="flex items-center gap-3 outline-0 cursor-pointer hover:bg-lightgray pl-2 text-xl"
                >
                  {city}
                </Select.Item>
              ))}
        </Select.Content>
      </Select.Root>
    </div>
  );
}

export default LocaleInput;
