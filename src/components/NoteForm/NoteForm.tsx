import { Field, Form, Formik, type FormikHelpers } from "formik";
import css from "./NoteForm.module.css";
import type { Tags } from "../../types/note";

interface NoteFormProps {
    onClose: () => void;
}
interface FormValues {
    title: string;
    content?: string;
    tag: Tags;
}

const initialValues: FormValues = { title: "", content: "", tag: "Todo" }

const handleCreateTask = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    console.log("submit", values)
    actions.resetForm();
}

export default function NoteForm({ onClose }: NoteFormProps) {
    return (
        <Formik initialValues={initialValues} onSubmit={handleCreateTask} >
            <Form className={css.form}>
                <div className={css.formGroup}>
                    <label htmlFor="title">Title</label>
                    <Field id="title" type="text" name="title" className={css.input} />
                    {/* <span name="title" className={css.error} /> */}
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="content">Content</label>
                    <Field
                        as="textarea"
                        id="content"
                        name="content"
                        rows={4}
                        className={css.textarea}
                    />
                    {/* <span name="content" className={css.error} /> */}
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="tag">Tag</label>
                    <Field as="select" id="tag" name="tag" className={css.select}>
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </Field>
                    {/* <span name="tag" className={css.error} /> */}
                </div>

                <div className={css.actions}>
                    <button type="button" className={css.cancelButton} onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={css.submitButton}
                        disabled={false}
                    >
                        Create note
                    </button>
                </div>
            </Form>
        </Formik >
    )
}