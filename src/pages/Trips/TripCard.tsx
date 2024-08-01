import { Card, CardActions, CardContent } from '@mui/material';
import { Trip } from 'models/Types';
import { TripButtons, TripContent } from './TripContent';

interface Props {
  trip: Trip;
}

export const TripCard = ({ trip }: Props) => {
  return (
    <Card>
      <CardContent>
        <TripContent trip={trip}></TripContent>
      </CardContent>
      <CardActions>
        <TripButtons trip={trip}></TripButtons>
      </CardActions>
    </Card>
  );
};
