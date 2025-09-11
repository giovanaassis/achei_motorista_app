function SignUpForm() {

  return (
    <>
      <input
        type="text"
        id="driver-name"
        placeholder="Nome"
        className="input p-2 text-xl"
      />

      <input
        type="email"
        id="driver-email"
        placeholder="E-mail"
        className="input p-2 text-xl"
      />

      <input
        type="password"
        id="driver-password"
        placeholder="Senha"
        className="input p-2 text-xl"
        autoComplete="off"
      />
    </>
  );
}

export default SignUpForm;
