"use client";

import { UserType } from "@/@types/user";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getMe, updateUser } from "../services/userService";
import { useRouter } from "next/navigation";

function EditAccountForm() {
  const [user, setUser] = useState<UserType | null>(null);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev!, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      currentPassword,
      newPassword,
    };

    const res = await updateUser(payload);
    if (!res) {
      alert("Algo deu errado! Tente novamente.");
    } else {
      alert("Usuário atualizado com sucesso!");
      router.push("/profile");
    }
  };

  useEffect(() => {
    getMe()
      .then((res) => setUser(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Nome"
        className="input p-2 text-xl"
        value={user?.name || ""}
        onChange={handleChange}
      />

      <input
        type="text"
        name="email"
        placeholder="E-mail"
        className="input p-2 text-xl"
        value={user?.email || ""}
        onChange={handleChange}
      />

      {/* STILL NEED TO VERIFY AND UPDATE THE PASSWORD */}

      <input
        type="password"
        name="password"
        placeholder="Senha"
        className="input p-2 text-xl"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />

      <input
        type="password"
        name="new-password"
        placeholder="Nova senha"
        className="input p-2 text-xl"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <button className="w-50 -mb-4" type="submit">
        atualizar conta
      </button>
      <span className="-mt-5 cursor-pointer">Esqueceu a senha?</span>
    </form>
  );
}

export default EditAccountForm;
