import IconButton from "./common/IconButton";
import {
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlinePushPin,
} from "react-icons/md";
import ToolBox from "./common/ToolBox";
import { NoteCardProps } from "../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { deleteNoteThunk } from "../features/thunks/noteThunk";
import Modal from "./common/Modal";
import Button from "./common/Button";
import { useState } from "react";

const NoteCard = ({ _id, title, text }: NoteCardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const handleDelete = ({ _id }: { _id: string }) => {
    dispatch(deleteNoteThunk({ _id }));
    setIsHidden(!isHidden);
  };

  return (
    <>
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
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">{text}</p>
        <hr />
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-600 font-bold">2 days ago</p>

          <div className="flex space-x-2 items-center">
            <ToolBox text="Delete">
              <IconButton
                size="sm"
                bg="danger"
                icon={<MdOutlineDelete size={16} />}
                rounded="full"
                onClick={() => setIsHidden(!isHidden)}
              />
            </ToolBox>

            <ToolBox text="Edit">
              <IconButton
                size="sm"
                bg="primary"
                icon={<MdOutlineEdit size={16} />}
                rounded="full"
              />
            </ToolBox>

            <ToolBox text="Pin Note">
              <IconButton
                size="sm"
                bg="secondary"
                icon={<MdOutlinePushPin size={16} />}
                rounded="full"
              />
            </ToolBox>
          </div>
        </div>
      </div>
      {/* Confirmation Modal */}
      <Modal isHidden={isHidden} setIsHidden={setIsHidden} title="Delete Note">
        <p className="mb-5  text-gray-600">
          Are you sure you want to delete this note?
        </p>
        <div className="flex items-center gap-2">
          <Button
            size="md"
            bg="danger"
            text="Yes"
            onClick={() => handleDelete({ _id })}
          />
          <Button
            size="md"
            bg="secondary"
            text="No"
            onClick={() => setIsHidden(!isHidden)}
          />
        </div>
      </Modal>
    </>
  );
};
export default NoteCard;
