import { FormState, SigninFields } from "@/lib/definitions";

function SignInForm({
  pending,
  state,
}: {
  pending: boolean;
  state: FormState<SigninFields>;
}) {
  return (
    <>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="E-mail"
        className="input p-2 text-xl"
      />
      {state?.errors?.email && (
        <p className="text-red -my-5">{state.errors.email}</p>
      )}

      <input
        type="password"
        id="password"
        name="password"
        placeholder="Senha"
        className="input p-2 text-xl"
        autoComplete="off"
      />
      {state?.errors?.password &&
        state.errors.password.map((err: string) => (
          <p key={err} className="text-red -my-5">
            {err}
          </p>
        ))}

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
