import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
// import { notes } from "../data/mockData";
import { AppDispatch } from "../app/store";
import { RootState } from "../app/store";
import { useEffect } from "react";
import { getNotesThunk } from "../features/thunks/noteThunk";
import SkeletonNote from "../components/skeleton/SkeletonNote";

const HomePage = () => {
  const {
    notes,
    // status: noteStatus,
    // error: noteError,
  } = useSelector<RootState, RootState["note"]>(
    (state: RootState) => state.note
  );
  const { status } = useSelector<RootState, RootState["note"]>(
    (state: RootState) => state.note
  );
  const dispatch = useDispatch<AppDispatch>();

  console.log(status, "STATUS");

  // Fetch notes
  useEffect(() => {
    const fetchNotes = async () => {
      await dispatch(getNotesThunk());
    };
    fetchNotes();
  }, [dispatch]);

  return (
    <>
      <Navbar />
      {/* Notes */}
      <h1 className="text-2xl font-bold pb-2 px-5 md:px-10">Notes</h1>
      <div className="w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-5 md:px-10 mb-20">
        {/* {notes.length === 0 && (
          <p className=" text-gray-500  ">No notes found</p>
        )} */}
        {status === "loading"
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonNote key={index} />
            ))
          : notes?.map((note) => <NoteCard key={note.id} {...note} />)}
      </div>
      <Footer />
    </>
  );
};
export default HomePage;
