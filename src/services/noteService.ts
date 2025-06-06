import axios from 'axios';
import { type CreateNote, type Note } from '../types/note';

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;
axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

export const fetchNotes = async () => {
  const response = await axios.get('/notes', {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  console.log(response.data.notes);
  return response.data;
};

export const createNote = async (noteData: CreateNote) => {
  const response = await axios.post<Note>('/notes', noteData);
  return response.data;
};

export const deleteNote = async (noteId: string) => {
  const response = await axios.delete(`/notes/${noteId}`);
  return response.data;
};
