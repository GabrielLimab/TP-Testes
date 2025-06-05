import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../services/authenticate";
import TextInput from "../Atoms/TextInput/TextInput";
import Button from "../Atoms/Button/Button";
import Socials from "../Atoms/Socials/Socials";
import "./Login.css";

interface LoginProps {
  setAuthMode: React.Dispatch<React.SetStateAction<string>>;
}

function Login({ setAuthMode }: LoginProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (email === "" || password === "") {
      setError("Fill in all inputs");
      return;
    }

    await login(email, password)
      .catch((err) => {
        setError(err);
        console.log(error);
        throw err;
      })
      .then(() => {
        navigate("/");
      });
    localStorage.setItem("token", "success");
    navigate("/");
  }

  return (
    <div className="login-container">
      <p className="welcome">SEJA BEM VINDO!</p>
      <p className="login-message">Entre em sua conta</p>
      <form className="login-form" onSubmit={handleLogin}>
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
        <div className="login-controls">
          <div className="remember">
            <input type="checkbox" id="remember" name="remember" />
            <label htmlFor="remember">Lembre de mim</label>
          </div>
          <a href="/">Esqueci minha senha</a>
        </div>
        <div className="submit-button">
          <Button text="CONTINUAR" darkMode></Button>
        </div>
      </form>
      <div className="text-divider">
        <strong>OU</strong>
      </div>
      <Socials></Socials>
      <p className="go-to-signup">
        Novo Usuário?{" "}
        <Link
          className="signup-link"
          to="#"
          onClick={() => {
            setAuthMode("signup");
          }}
        >
          <strong>INSCREVA-SE AQUI</strong>
        </Link>
      </p>
    </div>
  );
}
export default Login;
