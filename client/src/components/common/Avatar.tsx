interface AvatarProps {
  size: "sm" | "md" | "lg";
  src?: string;
}

const Avatar = ({ size = "md", src }: AvatarProps) => {
  console.log(src, "Avatar src");

  return (
    <div
      className={`
  ${size === "sm" ? "w-8 h-8" : size === "md" ? "w-12 h-12" : "w-16 h-16"}
  rounded-full
  bg-gray-300
  overflow-hidden
  relative
  `}
    >
      <img
        className="w-full h-full object-cover"
        src={
          src
            ? src
            : "https://www.pirelli.com/global/en-ww/assets/images/placeholder-avatar.png"
        }
        alt="avatar"
      />
    </div>
  );
};
export default Avatar;
