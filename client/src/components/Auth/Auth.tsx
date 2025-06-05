import { useState } from "react";
import logo from "../../assets/logo.png";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import "./Auth.css";

function Auth() {
  const [authMode, setAuthMode] = useState("login");

  return (
    <div className="auth-page">
      <div className="content">
        <div className="introduction">
          <div className="logo-container">
            <img src={logo} alt="logo" />
            <p className="title">Primeira Fila</p>
          </div>
          <div className="slides">
            <p>Avalie seus filmes favoritos</p>
            <span>
              Veja o que todos estão assistindo no momento, salve seus filmes
              preferidos e compartilhe sua opinião com o mundo.
            </span>
          </div>
        </div>
        <div className="auth-container">
          {authMode === "login" ? (
            <Login setAuthMode={setAuthMode} />
          ) : (
            <SignUp setAuthMode={setAuthMode}></SignUp>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;
