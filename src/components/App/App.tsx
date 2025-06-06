import { useQuery } from "@tanstack/react-query";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";

export default function App() {
  const { data, isPending } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });


  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
      </header>
      {data && !isPending && <NoteList notes={data.notes} />}
    </div>
  )
}
