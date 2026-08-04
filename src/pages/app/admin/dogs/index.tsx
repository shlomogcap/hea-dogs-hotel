import { useMemo } from 'react';
import Table from '@/lib/components/common/Table';
import getColumns from '@/lib/components/Dogs/columns';
import { AdminGuard } from '@/lib/components/AdminGuard';
import {
  AdminDogsProvider,
  useAdminDogsContext,
} from '@/lib/context/adminDogsContext';
import { useUserContext } from '@/lib/context/userContext';
import type { AdminDogItem } from '@/pages/api/admin/dogs';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ILang } from '@/lib/consts/displayTexts';

const PAGE_TITLE_LABEL: Record<ILang, string> = {
  he: 'כל הכלבים לפי בעלים',
  en: 'All dogs by owner',
};

const OWNER_HEADING_LABEL: Record<ILang, string> = {
  he: 'בעלים',
  en: 'Owner',
};

const DOGS_COUNT_LABEL: Record<ILang, (n: number) => string> = {
  he: (n) => `${n} כלבים`,
  en: (n) => `${n} dog${n !== 1 ? 's' : ''}`,
};

function groupDogsByOwner(dogs: AdminDogItem[]): { ownerId: string; dogs: AdminDogItem[] }[] {
  const map = new Map<string, AdminDogItem[]>();
  dogs.forEach((d) => {
    const list = map.get(d.ownerId) ?? [];
    list.push(d);
    map.set(d.ownerId, list);
  });
  return Array.from(map.entries())
    .map(([ownerId, list]) => ({ ownerId, dogs: list }))
    .sort((a, b) => a.ownerId.localeCompare(b.ownerId));
}

const AdminDogsInner = () => {
  const { preferences } = useUserContext();
  const { data: dogs, isLoading: loading, accessDenied } = useAdminDogsContext();
  const lang = (preferences?.lang ?? 'he') as ILang;

  const byOwner = useMemo(() => groupDogsByOwner(dogs), [dogs]);
  const columns = useMemo(() => getColumns(lang), [lang]);

  if (loading && dogs.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 200,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AdminGuard accessDenied={accessDenied}>
      <Box>
        <Typography variant='h5' sx={{ mb: 2 }}>
          {PAGE_TITLE_LABEL[lang]}
        </Typography>
        {byOwner.length === 0 ? (
          <Typography color='text.secondary'>
            {lang === 'he' ? 'אין כלבים במערכת' : 'No dogs in the system'}
          </Typography>
        ) : (
          byOwner.map(({ ownerId, dogs: ownerDogs }) => (
            <Accordion key={ownerId} defaultExpanded={byOwner.length <= 5}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 500 }}>
                  {OWNER_HEADING_LABEL[lang]}: {ownerId}
                </Typography>
                <Typography sx={{ color: 'text.secondary', ml: 1 }}>
                  ({DOGS_COUNT_LABEL[lang](ownerDogs.length)})
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0 }}>
                <Table
                  rows={ownerDogs}
                  columns={columns}
                  loading={false}
                  disableRowSelectionOnClick
                  getRowId={(row) => `${row.ownerId}_${row.id}`}
                />
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Box>
    </AdminGuard>
  );
};

export default function AdminDogsPage() {
  return (
    <AdminDogsProvider>
      <AdminDogsInner />
    </AdminDogsProvider>
  );
}
