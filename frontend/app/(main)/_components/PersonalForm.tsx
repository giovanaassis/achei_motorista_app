"use client";

import { DriverType } from "@/app/types/driver";
import { useState } from "react";
import LocaleInput from "@/app/components/LocaleInput";

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

function PersonalForm({ driver }: { driver?: DriverType }) {
  const [selectedState, setSelectedState] = useState<string | undefined>(
    driver?.state
  );
  const [selectedCity, setSelectedCity] = useState<string | undefined>(
    driver?.city
  );
  const [driverGender, setDriverGender] = useState<string | undefined>(
    driver?.gender
  );

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
              checked={driverGender === gender}
              onChange={(e) => setDriverGender(e.target.value)}
            />
            <div className="w-5 h-5 rounded-full border-2 border-gray-secondary peer-checked:bg-gray-secondary transition"></div>
            <span>{name}</span>
          </label>
        ))}
      </div>

      {/* LOCATION INPUT */}
      <div className="flex flex-col gap-3 text-2xl self-start mb-5">
        <input hidden name="state" defaultValue={selectedState} />
        <LocaleInput
          hasState={false}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
        />
      </div>

      <div className="flex flex-col gap-3 text-2xl self-start">
        <input hidden name="city" defaultValue={selectedCity} />
        <LocaleInput
          hasState={true}
          selectedState={selectedState}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
      </div>
    </>
  );
}

export default PersonalForm;
