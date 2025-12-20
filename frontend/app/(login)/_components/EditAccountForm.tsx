"use client";

import { UserType } from "@/app/types/user";
import { FormState, UserFormFields } from "@/lib/definitions";
import { useActionState } from "react";

interface EditAccountFormProps {
  user: UserType;
  handleSubmitAction: (
    state: FormState<UserFormFields>,
    data: FormData
  ) => Promise<{
    success: boolean;
    message?: string;
    errors?: Partial<Record<keyof UserFormFields, string[]>>;
  }>;
}

function EditAccountForm({ user, handleSubmitAction }: EditAccountFormProps) {
  const [state, formAction, pending] = useActionState(
    handleSubmitAction,
    undefined
  );

  return (
    <form className="loginForm" action={formAction}>
      <input
        type="text"
        name="name"
        placeholder="Nome"
        className="input p-2 text-xl"
        defaultValue={user.name}
      />
      {state?.errors?.name && (
        <p className="text-red -my-5">{state.errors.name}</p>
      )}

      <input
        type="text"
        name="email"
        placeholder="E-mail"
        className="input p-2 text-xl"
        defaultValue={user.email}
      />
      {state?.errors?.email && (
        <p className="text-red -my-5">{state.errors.email}</p>
      )}

      <input
        type="password"
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
        name="new_password"
        placeholder="Nova senha"
        className="input p-2 text-xl"
        autoComplete="off"
      />
      {state?.errors?.new_password &&
        state.errors.new_password.map((err: string) => (
          <p key={err} className="text-red -my-5">
            {err}
          </p>
        ))}

      <button className="w-50 -mb-4" type="submit">
        {pending ? "atualizando" : "atualizar conta"}
      </button>
      <span className="-mt-5 cursor-pointer">Esqueceu a senha?</span>
      {state?.message && <p>{state.message}</p>}
    </form>
  );
}

export default EditAccountForm;
