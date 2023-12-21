interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: "sm" | "md" | "lg";
  bg?: "primary" | "secondary" | "danger";
  onClick?: () => void;
  icon?: React.ReactNode;
  rounded?: "sm" | "md" | "lg" | "full";
}

const IconButton = ({
  size = "sm",
  bg = "primary",
  icon,
  rounded = "md",
  ...props
}: IconButtonProps) => {
  return (
    <button
      {...props}
      className={`
  ${
    size === "sm"
      ? "p-2 text-sm"
      : size === "md"
      ? "p-4  text-md"
      : "p-6  text-lg"
  }
  ${
    bg === "primary"
      ? "bg-blue-500 text-white hover:bg-blue-600"
      : bg === "secondary"
      ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
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
  `}
    >
      {icon && icon}
    </button>
  );
};
export default IconButton;
