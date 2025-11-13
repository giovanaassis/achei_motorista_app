import { UserType } from "@/@types/user";

interface SignUpFormProps {
  user: UserType | null;
  onChangeUser: (user: UserType) => void;
}

function SignUpForm({user, onChangeUser}: SignUpFormProps) {
  return (
    <>
      <input
        type="text"
        id="driver-name"
        placeholder="Nome"
        className="input p-2 text-xl"
        value={user?.username || ""}
        onChange={(e) => onChangeUser({ ...user!, username: e.target.value })}
      />

      <input
        type="email"
        id="driver-email"
        placeholder="E-mail"
        className="input p-2 text-xl"
        value={user?.email || ""}
        onChange={(e) => onChangeUser({ ...user!, email: e.target.value })}
      />

      <input
        type="password"
        id="driver-password"
        placeholder="Senha"
        className="input p-2 text-xl"
        autoComplete="off"
        value={user?.password || ""}
        onChange={(e) => onChangeUser({ ...user!, password: e.target.value })}
      />

      <button className="w-50 -mb-4" type="submit">criar conta</button>
    </>
  );
}

export default SignUpForm;
