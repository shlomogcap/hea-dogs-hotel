import { useMemo } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '../common/ListItem';
import { DogsProvider, useDogsContext } from '@/lib/context/userDogsContext';
import {
  InvitationsProvider,
  useInvitationsContext,
} from '@/lib/context/userInvitationsContext';
import { useUserContext } from '@/lib/context/userContext';
import { formatDate } from '@/lib/utils/dateUtils';
import { isSameOrAfter } from '@/lib/utils/dateUtils';
import type { IDogDoc } from '@/pages/api/dogs/create';
import type { IInvitationDoc } from '@/pages/api/invitation/create';
import { ILang } from '@/lib/consts/displayTexts';
import PetsIcon from '@mui/icons-material/Pets';
import EventNoteIcon from '@mui/icons-material/EventNote';

const MAX_HIGHLIGHTS = 5;

const LABELS: Record<
  ILang,
  {
    title: string;
    myDogs: string;
    myNextInvitations: string;
    viewAll: string;
    noDogs: string;
    noInvitations: string;
  }
> = {
  he: {
    title: 'בית',
    myDogs: 'הכלבים שלי',
    myNextInvitations: 'ההזמנות הקרובות',
    viewAll: 'הצג הכל',
    noDogs: 'אין כלבים רשומים',
    noInvitations: 'אין הזמנות קרובות',
  },
  en: {
    title: 'Home',
    myDogs: 'My Dogs',
    myNextInvitations: 'My Next Invitations',
    viewAll: 'View all',
    noDogs: 'No dogs registered',
    noInvitations: 'No upcoming invitations',
  },
};

const HomeInner = () => {
  const router = useRouter();
  const { preferences } = useUserContext();
  const { data: dogs, isLoading: dogsLoading } = useDogsContext();
  const { data: invitations, isLoading: invitationsLoading } =
    useInvitationsContext();
  const lang = (preferences?.lang ?? 'he') as ILang;
  const t = LABELS[lang];

  const nextInvitations = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return (invitations ?? [])
      .filter((inv) => inv.startDate && isSameOrAfter(inv.startDate, today))
      .sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      )
      .slice(0, MAX_HIGHLIGHTS);
  }, [invitations]);

  const dogsHighlight = (dogs ?? []).slice(0, MAX_HIGHLIGHTS);

  return (
    <Box>
      <Typography variant='h5' sx={{ mb: 3 }}>
        {t.title}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 3,
        }}
      >
        <Card variant='outlined'>
          <CardHeader
            sx={{
              '& .MuiCardHeader-content': {
                paddingInline: 2,
              },
            }}
            avatar={<PetsIcon color='primary' />}
            title={t.myDogs}
            subheader={dogsLoading ? '...' : `${(dogs ?? []).length}`}
            action={
              <Button
                size='small'
                onClick={() =>
                  router.push({
                    pathname: '/app/dogs',
                    query: { from: 'home' },
                  })
                }
                sx={{ textTransform: 'none' }}
              >
                {t.viewAll}
              </Button>
            }
          />
          <CardContent sx={{ pt: 0 }}>
            {dogsLoading ? (
              <Typography color='text.secondary'>...</Typography>
            ) : dogsHighlight.length === 0 ? (
              <Typography color='text.secondary'>{t.noDogs}</Typography>
            ) : (
              <List sx={{ p: 0, listStyle: 'none' }}>
                {dogsHighlight.map((row: IDogDoc) => (
                  <ListItem
                    sx={{
                      '&:last-child': { borderBottom: 'none' },
                    }}
                    key={row.id}
                    title={row.dogName ?? '-'}
                    subtitle={row.dogBread ? `${row.dogBread}` : undefined}
                    onRowClick={() =>
                      router.push({
                        pathname: `/app/dogs/${row.id}`,
                        query: { from: 'home' },
                      })
                    }
                  />
                ))}
              </List>
            )}
          </CardContent>
        </Card>

        <Card variant='outlined'>
          <CardHeader
            sx={{
              '& .MuiCardHeader-content': {
                paddingInline: 2,
              },
            }}
            avatar={<EventNoteIcon color='primary' />}
            title={t.myNextInvitations}
            subheader={invitationsLoading ? '...' : `${nextInvitations.length}`}
            action={
              <Button
                size='small'
                onClick={() =>
                  router.push({
                    pathname: '/app/invitations',
                    query: { from: 'home' },
                  })
                }
                sx={{ textTransform: 'none' }}
              >
                {t.viewAll}
              </Button>
            }
          />
          <CardContent sx={{ pt: 0 }}>
            {invitationsLoading ? (
              <Typography color='text.secondary'>...</Typography>
            ) : nextInvitations.length === 0 ? (
              <Typography color='text.secondary'>{t.noInvitations}</Typography>
            ) : (
              <List sx={{ p: 0, listStyle: 'none' }}>
                {nextInvitations.map((row: IInvitationDoc) => (
                  <ListItem
                    key={row.id}
                    sx={{
                      '&:last-child': { borderBottom: 'none' },
                    }}
                    title={
                      row.dogs?.map((d) => d.dogName).join(', ') ||
                      row.ownerName ||
                      '-'
                    }
                    subtitle={`${formatDate(row.startDate)} – ${formatDate(
                      row.endDate,
                    )}`}
                    onRowClick={() =>
                      router.push({
                        pathname: `/app/invitations/${row.id}`,
                        query: { from: 'home' },
                      })
                    }
                  />
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

const Home = () => (
  <DogsProvider>
    <InvitationsProvider>
      <HomeInner />
    </InvitationsProvider>
  </DogsProvider>
);

export default Home;
