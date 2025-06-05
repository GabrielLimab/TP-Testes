import "./Button.css";

interface ButtonProps {
  text: string;
  icon?: string;
  darkMode?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ text, icon, darkMode, onClick }: ButtonProps) => {
  return (
    <button
      className={`button-container ${darkMode ? "dark" : ""}`}
      onClick={onClick}
    >
      {icon && <img src={icon} alt="logo" />}
      {text}
    </button>
  );
};

export default Button;
