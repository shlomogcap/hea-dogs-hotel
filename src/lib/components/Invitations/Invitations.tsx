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
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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

const BACK_TO_DASHBOARD_LABEL: Record<'he' | 'en', string> = {
  he: 'חזרה לבית',
  en: 'Back to dashboard',
};

const InvitationsInner = () => {
  const { data, isLoading } = useInvitationsContext();
  const { preferences } = useUserContext();
  const router = useRouter();
  const fromHome = router.query.from === 'home';
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const columns = getColumns(preferences.lang ?? 'he');
  const lang = (preferences?.lang ?? 'he') as 'he' | 'en';

  const backButton = fromHome ? (
    <IconButton
      aria-label={BACK_TO_DASHBOARD_LABEL[lang]}
      onClick={() => router.push('/app')}
      sx={{
        mb: 1,
        mr: 1,
        ...(preferences?.lang === 'he' ? { transform: 'scaleX(-1)' } : {}),
      }}
    >
      <ArrowBackIcon />
    </IconButton>
  ) : null;

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
        {backButton}
        <Box sx={{ mb: 2 }}>{addNewInvitationButton}</Box>
        <InvitationsList
          data={data}
          onRowClick={({ id }) =>
            router.push({
              pathname: `/app/invitations/${id}`,
              ...(fromHome ? { query: { from: 'home' } } : {}),
            })
          }
        />
      </>
    );
  }
  return (
    <>
      {backButton}
      <Box sx={{ mb: 2 }}>{addNewInvitationButton}</Box>
      <Table
        loading={isLoading}
        rows={data}
        columns={columns}
        disableRowSelectionOnClick
        onRowClick={({ id }) => {
          router.push({
            pathname: `/app/invitations/${id}`,
            ...(fromHome ? { query: { from: 'home' } } : {}),
          });
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
