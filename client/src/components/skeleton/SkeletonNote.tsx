import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonNote = () => {
  return (
    <div
      className="
      w-full 
      bg-white
      shadow
      rounded-2xl
      p-5
      h-fit
      "
    >
      <div className="flex flex-col mb-5">
        <Skeleton
          baseColor="#f5f5f5"
          highlightColor="#e2e8f0"
          width={"80%"}
          count={1}
          className="mb-4"
        />
        <Skeleton
          baseColor="#f5f5f5"
          highlightColor="#e2e8f0"
          count={4}
          width={"100%"}
          height={"12px"}
        />
      </div>
      <hr />
      <div className="flex items-center justify-between mt-4 space-x-4">
        <div className="w-[40%]">
          <Skeleton
            baseColor="#f5f5f5"
            highlightColor="#e2e8f0"
            width={"100%"}
            height={"12px"}
          />
        </div>

        <div className="flex space-x-2 items-center">
          <div className="w-8 h-8 ">
            <Skeleton
              baseColor="#f5f5f5"
              highlightColor="#e2e8f0"
              circle
              width={"100%"}
              height={"100%"}
            />
          </div>
          <div className="w-8 h-8 ">
            <Skeleton
              baseColor="#f5f5f5"
              highlightColor="#e2e8f0"
              circle
              width={"100%"}
              height={"100%"}
            />
          </div>
          <div className="w-8 h-8 ">
            <Skeleton
              baseColor="#f5f5f5"
              highlightColor="#e2e8f0"
              circle
              width={"100%"}
              height={"100%"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SkeletonNote;
