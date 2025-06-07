import { keepPreviousData, useQuery } from "@tanstack/react-query";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import NoteModal from "../NoteModal/NoteModal";

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data, isSuccess } = useQuery({
    queryKey: ["notes", currentPage],
    queryFn: () => fetchNotes(currentPage),
    placeholderData: keepPreviousData,
  });
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />
        {isSuccess && (
          <Pagination totalPages={data.totalPages} currentPage={currentPage} onChange={setCurrentPage} />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>Create note +</button>
      </header>
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}
