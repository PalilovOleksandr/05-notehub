import axios from 'axios';
import { type CreateNote, type Note } from '../types/note';

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;
axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}
export const fetchNotes = async (page: number) => {
  const response = await axios.get<NotesHttpResponse>('/notes', {
    params: {
      page,
      perPage: '12',
    },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return response.data;
};

export const createNote = async (noteData: CreateNote) => {
  const response = await axios.post<Note>('/notes', noteData);
  return response.data;
};

export const deleteNote = async (id: number) => {
  const response = await axios.delete(`/notes/${id}`);
  return response.data;
};
