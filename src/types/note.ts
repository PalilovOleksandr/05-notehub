type Tags = 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo';

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: Tags;
}

export interface CreateNote {
  title: string;
  content?: string;
  tag: Tags;
}

export interface UpdateNote {
  id: string;
  text?: string;
  content?: string;
  tag?: Tags;
}
