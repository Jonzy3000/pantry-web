import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "info" | "loading";
  children?: React.ReactNode;
}

export const Button = ({ variant, children, className, ...rest }: Props) => {
  const common = "px-4 h-10 rounded cursor-pointer font-medium ";
  if (variant == "primary") {
    return (
      <button
        className={`bg-purple-500 hover:bg-purple-600 text-gray-100 ${common} ${className}`}
        {...rest}
      >
        {children}
      </button>
    );
  }

  if (variant == "loading") {
    return (
      <span className="animate-pulse">
        <div className={`w-20 bg-gray-100 ${common}`}></div>
      </span>
    );
  }

  return (
    <button
      className={`border-purple-700 text-purple-700 hover:bg-purple-100 border ${common} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
