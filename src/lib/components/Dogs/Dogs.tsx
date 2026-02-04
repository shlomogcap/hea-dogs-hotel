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

const DogsInner = () => {
  const { data, isLoading } = useDogsContext();
  const { preferences } = useUserContext();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const columns = getColumns(preferences.lang ?? 'he');
  const lang = preferences?.lang ?? 'he';

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
        <Box sx={{ mb: 2 }}>{addNewDogButton}</Box>
        <DogsList
          data={data}
          onRowClick={({ id }) => router.push(`/app/dogs/${id}`)}
        />
      </>
    );
  }
  return (
    <>
      <Box sx={{ mb: 2 }}>{addNewDogButton}</Box>
      <Table
        loading={isLoading}
        rows={data}
        columns={columns}
        disableRowSelectionOnClick
        onRowClick={({ id }) => {
          router.push(`/app/dogs/${id}`);
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
