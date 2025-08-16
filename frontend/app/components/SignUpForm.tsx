import { useAuth } from "../contexts/AuthContext";

function SignUpForm() {
  const { name, email, password, setName, setEmail, setPassword } = useAuth();

  return (
    <>
      <input
        type="text"
        id="driver-name"
        placeholder="Nome"
        className="input p-2 text-xl"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        id="driver-email"
        placeholder="E-mail"
        className="input p-2 text-xl"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        id="driver-password"
        placeholder="Senha"
        className="input p-2 text-xl"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="off"
      />
    </>
  );
}

export default SignUpForm;
