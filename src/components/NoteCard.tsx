import { Card, CardActions, CardContent, Collapse, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SaveIcon from '@mui/icons-material/Save';
import Fab from '@mui/material/Fab';

import Grid from '@mui/material/Unstable_Grid2';

import React from 'react';
import { Note } from '../models/Types';

export const NoteCard = ({ index, id, name, content }: Note) => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const noteCard = (
    <Grid key={index} xs={8} md={4}>
      <Card className={checked ? 'note-card-float' : ''} onClick={handleChange}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h3">
            {name}
          </Typography>
          <Collapse collapsedSize={77}>
            <TextField multiline fullWidth value={content} variant="standard" id="fullWidth" />
          </Collapse>
          <CardActions>
            <Fab color="primary" aria-label="sa" size="small">
              <SaveIcon />
            </Fab>
            <Fab color="primary" aria-label="expand" size="small" data-key={id}>
              <ExpandMoreIcon />
            </Fab>
          </CardActions>
        </CardContent>
      </Card>
    </Grid>
  );
  return noteCard;
};