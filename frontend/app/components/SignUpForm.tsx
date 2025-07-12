import React from "react";

function SignUpForm() {
  return (
    <>
      <input
        type="text"
        id="driver-name"
        placeholder="Nome Completo"
        className="input p-2 text-xl"
      />

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
    </>
  );
}

export default SignUpForm;
