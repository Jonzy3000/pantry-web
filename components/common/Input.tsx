import { useState } from "react";

interface InputProps {
  onSubmit?: (input: string) => void;
  className?: string;
}

export const Input = ({
  onSubmit,
  className,
  ...rest
}: InputProps &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.length > 0) {
      onSubmit && onSubmit(input);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <input
      onChange={handleChange}
      onKeyPress={handleKeyDown}
      value={input}
      className={className}
      {...rest}
    />
  );
};
