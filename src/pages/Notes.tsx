import { Box } from '@mui/material/Box';
import { Card } from '@mui/material/Card';
import { Typography } from '@mui/material';
import { useRecoilValueLoadable } from 'recoil';
import { myNotes } from '../state/noteState';


export const Notes = () => {
  const notesLoadable = useRecoilValueLoadable(myNotes);
  const notes = notesLoadable.state === 'hasValue' ? notesLoadable.contents : [];
  console.debug(notes);
  return <Typography>Trips</Typography>
  
  
};
