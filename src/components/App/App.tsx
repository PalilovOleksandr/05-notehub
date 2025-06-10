import { keepPreviousData, useQuery } from "@tanstack/react-query";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import NoteModal from "../NoteModal/NoteModal";
import Loader from "../Loader/Loader";
import { useDebounce } from "use-debounce";
import ErrorMessage from "../ErrorMessage/ErrorMessage";



export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery] = useDebounce(searchQuery, 300);

  const { data, isSuccess, isPending, isError } = useQuery({
    queryKey: ["notes", debouncedQuery, currentPage],
    queryFn: () => fetchNotes(debouncedQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery]);

  function handleSearchChange(query: string) {
    setSearchQuery(query)
  };

  function handlePageChange(page: number) {
    setCurrentPage(page);
  };
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={handleSearchChange} />
        {isSuccess && data.totalPages > 1 && (
          <Pagination totalPages={data.totalPages} currentPage={currentPage} onChange={handlePageChange} />
        )}
        <button className={css.button} onClick={openModal}>Create note +</button>
      </header>
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isError && <ErrorMessage text="There was an error, please try again..." />}
      {isModalOpen && <NoteModal onClose={closeModal} />}
      {isPending && <Loader />}
    </div>
  )
}
