"use client";

import Link from "next/link";
import LocaleInput from "./LocaleInput";
import { useState } from "react";

function SearchInputInitial() {
  const [selectedState, setSelectedState] = useState<string>(""); // STATE ID
  const [selectedCity, setSelectedCity] = useState<string>("");

  const getLocale = () => {
    alert(`Estado é ${selectedState} e cidade é ${selectedCity}`);
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
            setSelectedCity={setSelectedCity}
          />
        </div>
      </div>

      <Link href={"/search"} className="h-0" onClick={getLocale}>
        <button className="mt-60 md:mt-30">achar motoristas</button>
      </Link>
    </div>
  );
}

export default SearchInputInitial;
