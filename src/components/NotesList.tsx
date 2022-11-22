import { Grid } from '@mui/material';

import { NoteCard, Note } from './NoteCard';

interface Props {
  notes: Note[];
}

export const NoteList = ({ notes }: Props) => {
  // const [checked, setChecked] = React.useState(false);

  // const handleChange = () => {
  //   setChecked((prev) => !prev);
  // };

  const noteList = (
    <Grid container spacing={4}>
      {notes.map((item, index) => (
        <>
          {console.debug(`Note: ${index}`)}
          {notes && <NoteCard id={item.id} name={item.name} content={item.content}></NoteCard>}
        </>
      ))}
    </Grid>
  );
  return noteList;
};