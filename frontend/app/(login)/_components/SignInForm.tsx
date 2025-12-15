function SignInForm({ pending }: { pending: boolean }) {
  return (
    <>
      <input
        type="text"
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

      <input
        type="password"
        id="confirm-password"
        name="confirm-password"
        placeholder="Confirma a senha"
        className="input p-2 text-xl"
        autoComplete="off"
      />

      <span className="self-end -mt-5 cursor-pointer">Esqueceu a senha?</span>
      <button className="w-50 -mb-4" type="submit" disabled={pending}>
        entrar
      </button>
    </>
  );
}

export default SignInForm;
