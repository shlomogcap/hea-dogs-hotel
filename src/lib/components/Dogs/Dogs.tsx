import { DogsProvider, useDogsContext } from '@/lib/context/userDogsContext';
import Table from '../common/Table';
import getColumns from './columns';
import { useRouter } from 'next/router';
import List from '@mui/material/List';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useUserContext } from '@/lib/context/userContext';
import { IDogDoc } from '@/pages/api/dogs/create';
import ListItem from '../common/ListItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Box from '@mui/material/Box';

const DogsList = ({
  data,
  onRowClick,
}: {
  data: IDogDoc[];
  onRowClick: (row: IDogDoc) => void;
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
        title={row?.dogName}
      />
    ))}
  </List>
);

const ADD_NEW_DOG_LABEL: Record<'he' | 'en', string> = {
  he: 'הוספת כלב',
  en: 'Add new dog',
};

const BACK_TO_DASHBOARD_LABEL: Record<'he' | 'en', string> = {
  he: 'חזרה לבית',
  en: 'Back to dashboard',
};

const DogsInner = () => {
  const { data, isLoading } = useDogsContext();
  const { preferences } = useUserContext();
  const router = useRouter();
  const fromHome = router.query.from === 'home';
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const columns = getColumns(preferences.lang ?? 'he');
  const lang = preferences?.lang ?? 'he';

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

  const addNewDogButton = (
    <Button
      startIcon={<AddCircleOutlineIcon />}
      onClick={() => router.push('/app/dogs/new')}
      variant='contained'
      sx={{
        mb: 2,
        '& .MuiButton-startIcon': { marginInlineEnd: 1.5 },
      }}
    >
      {ADD_NEW_DOG_LABEL[lang]}
    </Button>
  );

  if (isMobile) {
    return (
      <>
        {backButton}
        <Box sx={{ mb: 2 }}>{addNewDogButton}</Box>
        <DogsList
          data={data}
          onRowClick={({ id }) =>
            router.push({
              pathname: `/app/dogs/${id}`,
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
      <Box sx={{ mb: 2 }}>{addNewDogButton}</Box>
      <Table
        loading={isLoading}
        rows={data}
        columns={columns}
        disableRowSelectionOnClick
        onRowClick={({ id }) => {
          router.push({
            pathname: `/app/dogs/${id}`,
            ...(fromHome ? { query: { from: 'home' } } : {}),
          });
        }}
      />
    </>
  );
};

const Dogs = () => {
  return (
    <DogsProvider>
      <DogsInner />
    </DogsProvider>
  );
};

export default Dogs;
