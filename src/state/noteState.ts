import { atom } from 'recoil';
import { Note } from '../models/Types';

export const noteState = atom<Note[]>({
  key: 'noteState',
  default: []
});
