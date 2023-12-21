interface ToolBoxProps {
  text: string;
  children: React.ReactNode;
  position?: "center" | "right" | "left";
}

const ToolBox = ({ text, children, position = "center" }: ToolBoxProps) => {
  return (
    <div className="relative group">
      {/* Item */}
      {children}
      {/* Toolbox */}
      <div
        className={`
        min-w-max
          px-3 py-px
          text-sm
          bg-gray-100
          rounded-sm
          shadow
          absolute
          font-medium
          after:absolute
        ${
          position === "center"
            ? "-bottom-8 left-1/2 -translate-x-1/2 after:-top-1 after:left-1/2 after:-translate-x-1/2"
            : position === "left"
            ? "top-1/2 -translate-y-1/2 -left-full after:-right-1 after:top-1/2 after:-translate-y-1/2"
            : ""
        }
          after:rotate-45
          after:w-2
          after:h-2
          after:bg-gray-100
          opacity-0
          transition
          
          duration-300
          group-hover:opacity-100
          capitalize
          delay-200
        `}
      >
        {text}
      </div>
    </div>
  );
};
export default ToolBox;
