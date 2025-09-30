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

const DogsInner = () => {
  const { data, isLoading } = useDogsContext();
  const { preferences } = useUserContext();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const columns = getColumns(preferences.lang ?? 'he');

  if (isMobile) {
    return (
      <DogsList
        data={data}
        onRowClick={({ id }) => router.push(`/app/dogs/${id}`)}
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
        router.push(`/app/dogs/${id}`);
      }}
    />
  );
};

const Dogs = () => {
  return (
    <DogsProvider>
      <DogsProvider>
        <DogsInner />
      </DogsProvider>
    </DogsProvider>
  );
};

export default Dogs;
