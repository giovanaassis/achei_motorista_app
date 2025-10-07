"use client";

import Image from "next/image";
import { useState } from "react";
import { useDriverContext } from "../context/DriverContext";

const genders = [
  {
    gender: "man",
    name: "Homem",
  },
  {
    gender: "woman",
    name: "Mulher",
  },
  {
    gender: "other",
    name: "Outro",
  },
];

function ProfileForm() {
  const [preview, setPreview] = useState<string | null>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const profileImage = e.target.files?.[0];
    if (profileImage) {
      setPreview(URL.createObjectURL(profileImage));
    }
  };

  return (
    <>
      {/* PROFILE IMAGE INPUT */}
      <div className="relative bg-black-primary rounded-full w-40 h-40 overflow-hidden flex items-center justify-center my-5">
        {!preview ? (
          <>
            <label
              htmlFor="driver-profile-image"
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
          id="driver-profile-image"
          onChange={handleImageChange}
          hidden
        />
      </div>

      {preview && (
        <label
          htmlFor="driver-profile-image"
          className="bg-lightgray p-1 rounded-xs hover:bg-[#a7a7a77c] cursor-pointer"
        >
          Trocar imagem
        </label>
      )}

      {/* GENDER INPUT */}
      <p className="text-2xl self-start">Gênero</p>
      <div className="flex gap-5 text-2xl self-start mb-5">
        {genders.map((gender) => (
          <label
            className="flex items-center justify-center gap-3 cursor-pointer"
            key={gender.gender}
          >
            <input
              type="radio"
              name="driver-gender"
              value={gender.gender}
              className="peer hidden"
            />
            <div className="w-5 h-5 rounded-full border-2 border-gray-secondary peer-checked:bg-gray-secondary transition"></div>
            <span>{gender.name}</span>
          </label>
        ))}
      </div>

      {/* LOCATION INPUT */}
      <div className="flex flex-col gap-3 text-2xl self-start mb-5">
        <label htmlFor="driver-state">Estado</label>
        <select name="driver-state" id="driver-state" className="input text-xl">
          <option value="rio">Rio de Janeiro</option>
          <option value="sao-paulo">São Paulo</option>
        </select>
      </div>

      <div className="flex flex-col gap-3 text-2xl self-start">
        <label htmlFor="driver-city">Cidade</label>
        <select name="driver-city" id="driver-city" className="input text-xl">
          <option value="nova-iguacu">Nova Iguaçu</option>
          <option value="guarulhos">Guarulhos</option>
        </select>
      </div>
    </>
  );
}

export default ProfileForm;
