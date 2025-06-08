import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";
import { deleteNote } from "../../services/noteService";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface NoteListProps {
    notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
    const queryClient = useQueryClient();
    const { mutate, isPending, isError, isSuccess } = useMutation({
        mutationFn: (id: number) => deleteNote(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        }
    });
    return (
        <>
            {isPending && !isSuccess && <div className={css.backdrop}><Loader /></div>}
            <ul className={css.list}>
                {notes.map(({ id, title, content, tag }) => (
                    <li className={css.listItem} key={id}>
                        <h2 className={css.title}>{title}</h2>
                        <p className={css.content}>{content}</p>
                        <div className={css.footer}>
                            <span className={css.tag}>{tag}</span>
                            <button className={css.button} onClick={() => mutate(id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            {isError && <ErrorMessage />}
        </>
    )
}