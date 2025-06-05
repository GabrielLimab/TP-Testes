import googleIcon from "../../../assets/google.svg";
import facebookIcon from "../../../assets/facebook.svg";
import appleIcon from "../../../assets/apple.svg";
import Button from "../Button/Button";
import "./Socials.css";

function Socials() {
  return (
    <div className="socials">
      <Button icon={googleIcon} text="Continuar com Google"></Button>
      <Button icon={facebookIcon} text="Continuar com Facebook"></Button>
      <Button icon={appleIcon} text="Continuar com Apple"></Button>
    </div>
  );
}
export default Socials;
