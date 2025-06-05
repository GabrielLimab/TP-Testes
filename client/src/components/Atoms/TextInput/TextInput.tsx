import "./TextInput.css";

interface TextInputProps {
  placeholder: string;
  value: string;
  type: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  name: string;
}

const TextInput = ({
  placeholder,
  value,
  type,
  setValue,
  name,
}: TextInputProps) => {
  return (
    <div className="text-input-container">
      <label className="legend" htmlFor={name}>
        {placeholder}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        id={name}
      />
    </div>
  );
};

export default TextInput;
