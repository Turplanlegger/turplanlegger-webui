import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Divider,
  Drawer,
  Grid,
  TextField,
  Toolbar,
  Typography
} from '@mui/material';
import React from 'react';

interface Props {
  notes: Note[];
}

type Note = {
  id: number;
  name: string;
  content: string;
};

export const NoteList = ({ notes }: Props) => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const noteList = (
    <Grid container spacing={4}>
      {notes.map((item, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h3">
                {item.name}
              </Typography>
              <Collapse in={checked} collapsedSize={77}>
                <TextField
                  multiline
                  fullWidth
                  value={item.content}
                  variant="standard"
                  id="fullWidth"
                  // onChange={}
                  InputProps={{
                    disableUnderline: true
                  }}
                />
              </Collapse>
              <CardActions>
                <Button size="small" onClick={handleChange}>
                  Show all
                </Button>
                <Button size="small">save</Button>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
  return noteList;
};
