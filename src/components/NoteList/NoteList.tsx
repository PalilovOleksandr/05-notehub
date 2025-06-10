import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";
import { deleteNote } from "../../services/noteService";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useState } from "react";

interface NoteListProps {
    notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
    const queryClient = useQueryClient();
    const [selectIdButton, setSelectIdButton] = useState<Note["id"] | null>(null);
    const { mutate, isError, isPending } = useMutation({
        mutationFn: (id: number) => deleteNote(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            setSelectIdButton(null);
        },
        onError: () => {
            setSelectIdButton(null);
        }
    });
    const handleButton = (id: number) => {
        setSelectIdButton(id);
        mutate(id);
    }
    return (
        <>
            <ul className={css.list}>
                {notes.map(({ id, title, content, tag }) => (
                    <li className={css.listItem} key={id}>
                        <h2 className={css.title}>{title}</h2>
                        <p className={css.content}>{content}</p>
                        <div className={css.footer}>
                            <span className={css.tag}>{tag}</span>
                            <button className={css.button} onClick={() => handleButton(id)} disabled={isPending}>{selectIdButton !== id ? "delete" : "in progress"}</button>
                        </div>
                    </li>
                ))}
            </ul>
            {isError && <ErrorMessage text="There was an error, please try again..." />}
        </>
    )
}