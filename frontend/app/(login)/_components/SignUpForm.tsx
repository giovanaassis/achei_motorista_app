import { FormState } from "@/lib/definitions";

function SignUpForm({
  pending,
  state,
}: {
  pending: boolean;
  state: FormState;
}) {
  return (
    <>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Nome"
        className="input p-2 text-xl"
      />
      {state?.errors?.username && (
        <p className="text-red -my-5">{state.errors.username}</p>
      )}

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
      {state?.errors?.password && (
        <p className="text-red -my-5">{state.errors.password}</p>
      )}

      <button className="w-50 -mb-4" type="submit" disabled={pending}>
        criar conta
      </button>
    </>
  );
}

export default SignUpForm;
