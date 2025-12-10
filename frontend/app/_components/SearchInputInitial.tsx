"use client";

import LocaleInput from "./LocaleInput";
import { useState } from "react";
import { useRouter } from "next/navigation";

function SearchInputInitial() {
  const [selectedState, setSelectedState] = useState<string>();
  const [selectedCity, setSelectedCity] = useState<string>();
  const router = useRouter();

  const handleQuery = () => {
    const query = new URLSearchParams();
    if (selectedState) {
      query.append("state", selectedState);
    }
    if (selectedCity) {
      query.append("city", selectedCity);
    }

    router.push(`/search?${query.toString()}`);
  };

  return (
    <div className="flex items-center flex-col">
      <div className="mt-[13%]">
        {/* STATE INPUT */}
        <div className="flex flex-col text-xl text-center tracking-widest gap-3 mb-10">
          <p>Qual o seu estado?</p>
          <LocaleInput
            hasState={false}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
          />
        </div>

        {/* CITY INPUT */}
        <div className="flex flex-col text-xl text-center tracking-widest gap-3">
          <p>Qual a sua cidade?</p>
          <LocaleInput
            hasState={true}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />
        </div>
      </div>

      <button className="mt-60 md:mt-30" onClick={handleQuery}>
        achar motoristas
      </button>
    </div>
  );
}

export default SearchInputInitial;
