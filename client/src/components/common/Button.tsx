interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  size: "sm" | "md" | "lg";
  children?: React.ReactNode;
  bg?: "primary" | "secondary" | "danger";
  onClick?: () => void;
  icon?: React.ReactNode;
  rounded?: "sm" | "md" | "lg" | "full";
}

const Button = ({
  text,
  size = "sm",
  bg = "primary",
  icon,
  rounded = "md",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={`
  ${
    size === "sm"
      ? "px-2 py-1 text-sm"
      : size === "md"
      ? "px-4 py-2 text-md"
      : "px-6 py-3 text-lg"
  }
  ${
    bg === "primary"
      ? "bg-blue-500 text-white hover:bg-blue-600"
      : bg === "secondary"
      ? "bg-gray-200 text-primary-800 hover:bg-gray-300"
      : "bg-red-500 text-white hover:bg-red-600"
  }
  ${
    rounded === "sm"
      ? "rounded-sm"
      : rounded === "md"
      ? "rounded-md"
      : rounded === "lg"
      ? "rounded-lg"
      : "rounded-full"
  }
  font-bold
  flex 
  items-center
  justify-center
  gap-1
  transition
  duration-300
  capitalize
  disabled:cursor-not-allowed
  disabled:opacity-50
  `}
    >
      {icon && icon}
      {text}
    </button>
  );
};
export default Button;
