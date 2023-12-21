import { Link } from "react-router-dom";
import { MdAdd, MdLogout, MdOutlineDarkMode } from "react-icons/md";
import Button from "./common/Button";
import Modal from "./common/Modal";
import { useState } from "react";
import IconButton from "./common/IconButton";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { logoutThunk } from "../features/thunks/authThunk";
import ToolBox from "./common/ToolBox";
import { createNoteThunk } from "../features/thunks/noteThunk";

interface ErrorResponse {
  path: string;
  msg: string;
}

const Navbar = () => {
  const {
    value: title,
    onChange: handleTitle,
    setValue: setTitle,
  } = useInput<string>("");
  const {
    value: text,
    onChange: handleContent,
    setValue: setContent,
  } = useInput<string>("");

  const { status: noteStatus } = useSelector<RootState, RootState["note"]>(
    (state: RootState) => state.note
  );
  const [titleError, setTitleError] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async (): Promise<void> => {
    try {
      const res = await dispatch(logoutThunk());

      if (logoutThunk.fulfilled.match(res)) {
        console.log("Logged out successfully");
      } else {
        console.log("Unexpected server response:", res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [isHidden, setIsHidden] = useState<boolean>(true);

  const handleAddNote = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const res = await dispatch(createNoteThunk({ title, text }));

      if (createNoteThunk.fulfilled.match(res)) {
        console.log("Note created successfully");
        setIsHidden(true);
        setTitle("");
        setContent("");
        setTitleError("");
      }

      if (createNoteThunk.rejected.match(res)) {
        if (typeof res.payload === "string") {
          setTitleError(res.payload);
        }

        if (Array.isArray(res.payload)) {
          // If payload is an array of errors
          setTitleError("");
          res.payload.map((err: ErrorResponse) => {
            setTitleError(err.msg);
          });
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="
        w-full 
        h-16
        bg-white
        shadow
        px-5
        md:px-10
        flex
        itemes-center
        justify-between
        mb-10
        "
      >
        <Link to="/" className="flex items-center">
          <h2 className="font-extrabold text-2xl tracking-tight text-blue-600">
            Noteify
          </h2>
        </Link>

        <div
          className="
          flex
          items-center
          gap-2
          "
        >
          {/* <p className="text-lg font-semiibold">Welcome, Axel</p> */}
          <ToolBox text="Create Note" position="center">
            <Button
              size="md"
              icon={<MdAdd size={24} />}
              bg="primary"
              text="Add"
              rounded="full"
              onClick={() => setIsHidden(!isHidden)}
            />
          </ToolBox>
          <ToolBox text="Switch Theme">
            <IconButton
              size="sm"
              bg="secondary"
              icon={<MdOutlineDarkMode size={24} />}
              rounded="full"
            />
          </ToolBox>
          <ToolBox text="Logout">
            <IconButton
              size="sm"
              bg="secondary"
              icon={<MdLogout size={24} />}
              rounded="full"
              onClick={handleLogout}
            />
          </ToolBox>
        </div>
      </div>

      <Modal isHidden={isHidden} setIsHidden={setIsHidden} title="Create Note">
        <form className="w-full" onSubmit={handleAddNote}>
          <div
            className="
          flex 
          flex-col
          gap-2
          mb-5
          "
          >
            <label htmlFor="title" className="text-sm font-bold">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter title"
              className="
              p-3
              outline-none
              bg-transparent
              placeholder:text-primary-200
              text-lg
              border
              border-primary-100
              focus:border-cyan-600
              focus:border-2
              rounded-lg
            "
              onChange={handleTitle}
              value={title}
            />
            {titleError && <p className="text-red-500">{titleError}</p>}
          </div>

          <div
            className="
          flex 
          flex-col
          gap-2
          mb-5
          "
          >
            <label htmlFor="text" className="text-sm font-bold">
              Text
            </label>
            <textarea
              name="text"
              id="text"
              className="
              p-3
              outline-none
              bg-transparent
              placeholder:text-primary-200
              text-lg
              border
              border-primary-100
              focus:border-cyan-600
              focus:border-2
              rounded-lg
              min-h-[200px]
           "
              placeholder="Enter text"
              onChange={handleContent}
              value={text}
            ></textarea>
          </div>

          <div
            className="
          flex 
          items-center
          gap-2
          "
          >
            <Button
              size="md"
              text={noteStatus === "loading" ? "Saving..." : "Save"}
              rounded="full"
              disabled={noteStatus === "loading" ? true : false}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};
export default Navbar;
