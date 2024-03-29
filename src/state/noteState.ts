import { atom, selector } from 'recoil';
import { Note } from '../models/Types';
import { apiState } from './apiState';

const initializeNotesSelector = selector<Note[]>({
  key: `initializeNotesSelector`,
  get: async ({ get }) => {
    const api = get(apiState);
    const result = await api?.get('/notes/mine');
    return result?.status === 'ok' ? result.note : [];
  }
});

export const noteState = atom<Note[]>({
  key: 'noteState',
  default: initializeNotesSelector
});

export const emptyNote = {
  id: 0,
  name: '',
  content: '',
  private: false
};

export const newNoteAtom = atom<Note>({
  key: 'newNoteAtom',
  default: emptyNote
});
