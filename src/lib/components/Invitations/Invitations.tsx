import {
  InvitationsProvider,
  useInvitationsContext,
} from '@/lib/context/userInvitationsContext';
import Table from '../common/Table';
import getColumns from './columns';
import { useRouter } from 'next/router';
import List from '@mui/material/List';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { formatDate } from '@/lib/utils/dateUtils';
import { useUserContext } from '@/lib/context/userContext';
import { DogsProvider } from '@/lib/context/userDogsContext';
import { IInvitationDoc } from '@/pages/api/invitation/create';
import ListItem from '../common/ListItem';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Box from '@mui/material/Box';

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
        onRowClick={() => onRowClick(row)}
        title={row?.dogs?.map((dog) => dog.dogName).join(', ')}
        subtitle={`${formatDate(row.startDate)} - ${formatDate(row.endDate)}`}
      />
    ))}
  </List>
);

const ADD_NEW_INVITATION_LABEL: Record<'he' | 'en', string> = {
  he: 'הזמנת מקום לפנסיון',
  en: 'Add new invitation',
};

const InvitationsInner = () => {
  const { data, isLoading } = useInvitationsContext();
  const { preferences } = useUserContext();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const columns = getColumns(preferences.lang ?? 'he');
  const lang = (preferences?.lang ?? 'he') as 'he' | 'en';

  const addNewInvitationButton = (
    <Button
      startIcon={<AddCircleOutlineIcon />}
      onClick={() => router.push('/app/invitations/new')}
      variant='contained'
      sx={{
        mb: 2,
        '& .MuiButton-startIcon': { marginInlineEnd: 1.5 },
      }}
    >
      {ADD_NEW_INVITATION_LABEL[lang]}
    </Button>
  );

  if (isMobile) {
    return (
      <>
        <Box sx={{ mb: 2 }}>{addNewInvitationButton}</Box>
        <InvitationsList
          data={data}
          onRowClick={({ id }) => router.push(`/app/invitations/${id}`)}
        />
      </>
    );
  }
  return (
    <>
      <Box sx={{ mb: 2 }}>{addNewInvitationButton}</Box>
      <Table
        loading={isLoading}
        rows={data}
        columns={columns}
        disableRowSelectionOnClick
        onRowClick={({ id }) => {
          router.push(`/app/invitations/${id}`);
        }}
      />
    </>
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
