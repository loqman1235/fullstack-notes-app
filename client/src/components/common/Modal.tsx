import { useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import IconButton from "./IconButton";

interface ModalProps {
  children: React.ReactNode;
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
  isHidden: boolean;
  title?: string;
}

const Modal = ({ children, isHidden, setIsHidden, title }: ModalProps) => {
  const modelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!modelRef.current) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modelRef.current &&
        !modelRef.current.contains(event.target as Node)
      ) {
        setIsHidden(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    if (!isHidden) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isHidden]);

  return (
    <div
      className={`
      ${isHidden && "hidden"}
      w-full 
      h-screen
      bg-black/70
      fixed
      top-0
      left-0
      z-10
      flex 
      items-center
      justify-center
      backdrop-blur-sm
        p-5
      `}
      ref={modelRef}
      onClick={() => setIsHidden(true)}
    >
      <div
        className="
        max-w-lg 
        w-full 
        px-5
        rounded-2xl
        shadow-4xl
        bg-white
        animate_popup
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="
          flex 
          items-center
          justify-between
          py-5
          border-b
        border-b-primary-100
          "
        >
          <h1 className="text-2xl font-bold">{title}</h1>
          <IconButton
            size="sm"
            bg="secondary"
            icon={<MdClose size={20} />}
            rounded="full"
            onClick={() => setIsHidden(true)}
          />
        </div>
        <div className="py-5">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
