function SignUpForm() {
  return (
    <>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Nome"
        className="input p-2 text-xl"
      />

      <input
        type="email"
        id="email"
        name="email"
        placeholder="E-mail"
        className="input p-2 text-xl"
      />

      <input
        type="password"
        id="password"
        name="password"
        placeholder="Senha"
        className="input p-2 text-xl"
        autoComplete="off"
      />

      <button className="w-50 -mb-4" type="submit">
        criar conta
      </button>
    </>
  );
}

export default SignUpForm;
