"use client";

import { DriverType } from "@/@types/driver";
import { useEffect, useState } from "react";
import LocaleInput from "./LocaleInput";

const genders = [
  {
    gender: "homem",
    name: "Homem",
  },
  {
    gender: "mulher",
    name: "Mulher",
  },
  {
    gender: "outro",
    name: "Outro",
  },
];

interface ProfileFormProps {
  driver: DriverType | null;
  onChangeDriver: (name: keyof DriverType, value: string | number) => void;
}

function ProfileForm({ driver, onChangeDriver }: ProfileFormProps) {
  const [selectedState, setSelectedState] = useState<number | undefined>(
    driver?.state_id
  );
  const [selectedCity, setSelectedCity] = useState<number | undefined>(
    driver?.city_id
  );

  useEffect(() => {
    if (driver?.state_id) {
      setSelectedState(driver.state_id);
    }
    if (driver?.city_id) {
      setSelectedCity(driver.city_id);
    }
  }, [driver?.city_id, driver?.state_id]);

  // UPDATES STATE
  useEffect(() => {
    if (selectedState && selectedState !== driver?.state_id) {
      onChangeDriver("state_id", String(selectedState));
    }
  }, [driver?.state_id, onChangeDriver, selectedState]);

  // UPDATES CITY
  useEffect(() => {
    if (selectedCity && selectedCity !== driver?.city_id) {
      onChangeDriver("city_id", String(selectedCity));
    }
  }, [driver?.city_id, onChangeDriver, selectedCity]);

  return (
    <>
      {/* PROFILE IMAGE INPUT */}
      {/* <div className="relative bg-black-primary rounded-full w-40 h-40 overflow-hidden flex items-center justify-center my-5">
        {!preview ? (
          <>
            <label
              htmlFor="profile-image"
              className="text-white cursor-pointer"
            >
              Carregue uma imagem
            </label>
          </>
        ) : (
          <Image
            src={preview}
            alt="preview"
            className="object-cover rounded-full"
            fill
            sizes="160px"
          />
        )}

        <input
          type="file"
          accept="image/*"
          id="profile-image"
          onChange={handleImageChange}
          hidden
        />
      </div> */}

      {/* {preview && (
        <label
          htmlFor="profile-image"
          className="bg-lightgray p-1 rounded-xs hover:bg-[#a7a7a77c] cursor-pointer"
        >
          Trocar imagem
        </label>
      )} */}

      {/* GENDER INPUT */}
      <p className="text-2xl self-start mt-5">Gênero</p>
      <div className="flex gap-5 text-2xl self-start my-5">
        {genders.map(({ gender, name }) => (
          <label
            className="flex items-center justify-center gap-3 cursor-pointer"
            key={gender}
          >
            <input
              type="radio"
              name="gender"
              value={gender}
              className={`peer hidden`}
              checked={driver?.gender === gender}
              onChange={(e) => onChangeDriver("gender", e.target.value)}
            />
            <div className="w-5 h-5 rounded-full border-2 border-gray-secondary peer-checked:bg-gray-secondary transition"></div>
            <span>{name}</span>
          </label>
        ))}
      </div>

      {/* LOCATION INPUT */}
      <div className="flex flex-col gap-3 text-2xl self-start mb-5">
        <LocaleInput
          hasState={false}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
        />
      </div>

      <div className="flex flex-col gap-3 text-2xl self-start">
        <LocaleInput
          hasState={true}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
      </div>
    </>
  );
}

export default ProfileForm;
