import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
    notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
    return (
        <ul className={css.list}>
            {notes.map(({ id, title, content, tag }) => (
                <li className={css.listItem} key={id}>
                    <h2 className={css.title}>{title}</h2>
                    <p className={css.content}>{content}</p>
                    <div className={css.footer}>
                        <span className={css.tag}>{tag}</span>
                        <button className={css.button}>Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    )
}