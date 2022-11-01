import { Typography } from '@mui/material';
import { useRecoilValueLoadable } from 'recoil';
import { myTrips } from '../state/tripState';

export const Trips = () => {
  const tripsLoadable = useRecoilValueLoadable(myTrips);
  const trips = tripsLoadable.state === 'hasValue' ? tripsLoadable.contents : [];
  return <Typography>Trips</Typography>;
};
