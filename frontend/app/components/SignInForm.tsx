import React from "react";

function SignInForm() {
  return (
    <>
      <input
        type="text"
        id="driver-email"
        placeholder="E-mail"
        className="input p-2 text-xl"
      />

      <input
        type="text"
        id="driver-password"
        placeholder="Senha"
        className="input p-2 text-xl"
      />

      <input
        type="text"
        id="driver-password"
        placeholder="Confirma a senha"
        className="input p-2 text-xl"
      />

      <span className="self-end -mt-5 cursor-pointer">Esqueceu a senha?</span>
    </>
  );
}

export default SignInForm;
