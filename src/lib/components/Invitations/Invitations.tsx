import {
  InvitationsProvider,
  useInvitationsContext,
} from '@/lib/context/userInvitationsContext';
import Table from '../common/Table';
import getColumns from './columns';
import { useRouter } from 'next/router';
import { List, ListItem, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IInvitationDoc } from '@/pages/api/invitation/create';
import { formatDate } from '@/lib/utils/dateUtils';
import { useUserContext } from '@/lib/context/userContext';
import { DogsProvider } from '@/lib/context/userDogsContext';

const InvitationsList = ({
  data,
  onRowClick,
}: {
  data: IInvitationDoc[];
  onRowClick: (row: IInvitationDoc) => void;
}) => (
  <List
    sx={{
      width: '100%',
      bgcolor: 'background.paper',
      p: 0,
      listStyle: 'none',
    }}
  >
    {data.map((row) => (
      <ListItem
        key={row.id}
        onClick={() => onRowClick(row)}
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
        <span style={{ fontWeight: 500 }}>
          {row?.dogs?.map((dog) => dog.dogName).join(', ')}
        </span>
        <span style={{ fontSize: 13, color: '#666' }}>
          {formatDate(row.startDate)} - {formatDate(row.endDate)}
        </span>
      </ListItem>
    ))}
  </List>
);

const InvitationsInner = () => {
  const { data, isLoading } = useInvitationsContext();
  const { preferences } = useUserContext();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const columns = getColumns(preferences.lang ?? 'he');

  if (isMobile) {
    return (
      <InvitationsList
        data={data}
        onRowClick={({ id }) => router.push(`/app/invitations/${id}`)}
      />
    );
  }
  return (
    <Table
      loading={isLoading}
      rows={data}
      columns={columns}
      disableRowSelectionOnClick
      onRowClick={({ id }) => {
        router.push(`/app/invitations/${id}`);
      }}
    />
  );
};

const Invitations = () => {
  return (
    <InvitationsProvider>
      <DogsProvider>
        <InvitationsInner />
      </DogsProvider>
    </InvitationsProvider>
  );
};

export default Invitations;
