import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../Atoms/TextInput/TextInput";
import Button from "../Atoms/Button/Button";
import Socials from "../Atoms/Socials/Socials";
import "./SignUp.css";
import { login, signup } from "../../services/authenticate";

interface SignUpProps {
  setAuthMode: React.Dispatch<React.SetStateAction<string>>;
}

function SignUp({ setAuthMode }: SignUpProps) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (name === "" || email === "" || password === "") {
      setError("Preencha todos os campos");
      return;
    }

    await signup(name, email, password)
      .catch((err) => {
        setError(err);
        console.log(error);
        throw err;
      })
      .then(() => {
        login(email, password)
          .catch((err) => {
            setError(err);
            console.log(error);
            throw err;
          })
          .then(() => {
            localStorage.setItem("token", "success");
            navigate("/");
          });
      });
  }
  return (
    <div className="signup-container">
      <p className="welcome">INSCREVA-SE!</p>
      <p className="signup-message">Crie sua conta</p>
      <form className="signup-form" onSubmit={handleSignUp}>
        <TextInput
          placeholder="Seu Nome"
          value={name}
          type="name"
          setValue={setName}
          name="name"
        />
        <TextInput
          placeholder="Email"
          value={email}
          type="email"
          setValue={setEmail}
          name="email"
        />
        <TextInput
          placeholder="Senha"
          value={password}
          type="password"
          setValue={setPassword}
          name="password"
        />
        <div className="submit-button">
          <Button text="INSCREVER-SE" darkMode></Button>
        </div>
      </form>
      <div className="text-divider">
        <strong>Ou</strong>
      </div>
      <Socials></Socials>
      <p className="go-to-login">
        Já possui uma conta?{" "}
        <Link
          to="#"
          onClick={() => {
            setAuthMode("login");
          }}
        >
          <strong>ENTRE AQUI</strong>
        </Link>
      </p>
    </div>
  );
}

export default SignUp;
