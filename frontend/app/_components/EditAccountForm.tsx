"use client";

import { UserType } from "@/app/@types/user";
import { useState, useTransition } from "react";

interface EditAccountFormProps {
  user: UserType;
  handleSubmitAction: (
    data: FormData
  ) => Promise<{ success: boolean; message?: string }>;
}

function EditAccountForm({ user, handleSubmitAction }: EditAccountFormProps) {
  const [isPending, startTransition] = useTransition();
  const [feedBackMessage, setFeedBackMessage] = useState<string>();

  return (
    <form
      className="loginForm"
      action={(formData) =>
        startTransition(async () => {
          const result = await handleSubmitAction(formData);
          if (!result.success) {
            setFeedBackMessage(result.message);
          }
        })
      }
    >
      <input
        type="text"
        name="name"
        placeholder="Nome"
        className="input p-2 text-xl"
        defaultValue={user.name}
      />

      <input
        type="text"
        name="email"
        placeholder="E-mail"
        className="input p-2 text-xl"
        defaultValue={user.email}
      />

      <input
        type="password"
        name="password"
        placeholder="Senha"
        className="input p-2 text-xl"
      />

      <input
        type="password"
        name="new_password"
        placeholder="Nova senha"
        className="input p-2 text-xl"
      />

      <button className="w-50 -mb-4" type="submit">
        {isPending ? "atualizando" : "atualizar conta"}
      </button>
      <span className="-mt-5 cursor-pointer">Esqueceu a senha?</span>
      {feedBackMessage && <p>{feedBackMessage}</p>}
    </form>
  );
}

export default EditAccountForm;
