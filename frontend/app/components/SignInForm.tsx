import { UserType } from "@/@types/user";

interface SignInFormProps {
  user: UserType | null;
  onChangeUser: (user: UserType) => void;
  confirmPassword: string;
  onConfirmPassword: (password: string) => void;
}

function SignInForm({
  user,
  onChangeUser,
  confirmPassword,
  onConfirmPassword,
}: SignInFormProps) {
  return (
    <>
      <input
        type="text"
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
        value={user?.password || ""}
        onChange={(e) => onChangeUser({ ...user!, password: e.target.value })}
      />

      <input
        type="password"
        id="confirm-password"
        placeholder="Confirma a senha"
        className="input p-2 text-xl"
        value={confirmPassword}
        onChange={(e) => onConfirmPassword(e.target.value)}
      />

      <span className="self-end -mt-5 cursor-pointer">Esqueceu a senha?</span>

      <button className="w-50 -mb-4">entrar</button>
    </>
  );
}

export default SignInForm;
