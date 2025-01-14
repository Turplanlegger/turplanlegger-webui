import {
  Typography,
  Chip,
  List,
  ListItemIcon,
  ListItemButton,
  Checkbox,
  ListItemText,
  ListItem as MuiListItem
} from '@mui/material';
import { ListItem } from 'models/Types';

interface Props {
  title?: string;
  items: ListItem[];
  toggleItem: (items: ListItem) => void;
}

export const ItemListItems = ({ title, items, toggleItem }: Props) => {
  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
        <Chip label={items.length} size="small" sx={{ ml: 1, pt: 0.25 }} />
      </Typography>
      <List>
        {items &&
          items.map((list_item) => (
            <MuiListItem key={list_item.id} disablePadding>
              <ListItemIcon sx={{ minWidth: '30px' }}>
                <ListItemButton
                  role={undefined}
                  onClick={() => {
                    toggleItem(list_item);
                  }}
                  dense
                  sx={{ pr: 0.7, mr: 1 }}
                >
                  <Checkbox
                    edge="start"
                    checked={list_item.checked}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': list_item.content?.toString() }}
                  />
                </ListItemButton>
              </ListItemIcon>
              <ListItemText primary={list_item.content} />
            </MuiListItem>
          ))}
      </List>
    </>
  );
};
