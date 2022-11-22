import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SaveIcon from '@mui/icons-material/Save';
import Fab from '@mui/material/Fab';

import React from 'react';

export interface Note {
  id: number;
  name: string;
  content: string;
}

export const NoteCard = ({ id, name, content }: Note) => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const noteCard = (
    <Grid item key={id} xs={12} sm={6} md={4}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h3">
            {name}
          </Typography>
          <Collapse in={checked} collapsedSize={77}>
            <TextField multiline fullWidth value={content} variant="standard" id="fullWidth" />
          </Collapse>
          <CardActions>
            <Fab color="primary" aria-label="sa" size="small">
              <SaveIcon />
            </Fab>
            <Fab
              color="primary"
              aria-label="expand"
              size="small"
              onClick={handleChange}
              data-key={id}>
              <ExpandMoreIcon />
            </Fab>
          </CardActions>
        </CardContent>
      </Card>
    </Grid>
  );
  return noteCard;
};
