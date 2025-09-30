import MuiListItem, {
  ListItemProps as MuiListItemProps,
} from '@mui/material/ListItem';

type ListItemProps = MuiListItemProps & {
  onRowClick: () => void;
  title: string;
  subtitle?: string;
};

const ListItem = ({ onRowClick, title, subtitle }: ListItemProps) => (
  <MuiListItem
    onClick={onRowClick}
    sx={{
      cursor: 'pointer',
      px: 2,
      py: 1.5,
      borderBottom: '1px solid',
      borderColor: 'divider',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      '&:hover': {
        bgcolor: 'action.hover',
      },
    }}
    disableGutters
  >
    <span style={{ fontWeight: 500 }}>{title}</span>
    <span style={{ fontSize: 13, color: '#666' }}>{subtitle}</span>
  </MuiListItem>
);

export default ListItem;
