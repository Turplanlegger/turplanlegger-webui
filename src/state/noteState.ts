import { atom, selector } from 'recoil';
import { Note } from '../models/Types';
import { apiState } from './apiState';

const initializeNotesSelector = selector<Note[]>({
  key: `initializeNotesSelector`,
  get: async ({ get }) => {
    const api = get(apiState);
    try {
      const result = await api?.get('/notes/mine');
      return result.note;
    } catch {
      return [];
    }
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
