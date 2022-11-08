import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar
} from '@mui/material';

interface Props {
  notes: Note[];
}

type Note = {
  id: number;
  name: string;
  content: string;
};

export const NoteList = ({ notes }: Props) => {
  const noteList = (
    <List>
      {notes.map((item, index) => (
        <ListItem key={index} disablePadding>
          <>{console.debug(item)}</>
          <ListItemText>{item.name}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
  return noteList;
};
