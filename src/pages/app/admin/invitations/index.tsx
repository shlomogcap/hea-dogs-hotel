import { useCallback } from 'react';
import Table from '@/lib/components/common/Table';
import {
  getAdminInvitationsColumns,
  OnAdminStatusChange,
} from '@/lib/components/Invitations/adminColumns';
import { useUserContext } from '@/lib/context/userContext';
import {
  AdminInvitationsProvider,
  useAdminInvitationsContext,
} from '@/lib/context/adminInvitationsContext';
import { AdminGuard } from '@/lib/components/AdminGuard';
import type { AdminInvitationItem } from '@/pages/api/admin/invitations';
import type { InvitationStatus } from '@/pages/api/invitation/create';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { ILang } from '@/lib/consts/displayTexts';
import axios from 'axios';

const PAGE_TITLE_LABEL: Record<ILang, string> = {
  he: 'ניהול הזמנות',
  en: 'Admin – Invitations',
};

const AdminInvitationsInner = () => {
  const { preferences } = useUserContext();
  const {
    data: invitations,
    isLoading: loading,
    accessDenied,
  } = useAdminInvitationsContext();
  const lang = (preferences?.lang ?? 'he') as ILang;

  const handleStatusChange: OnAdminStatusChange = useCallback(
    async (row: AdminInvitationItem, status: InvitationStatus) => {
      try {
        await axios.patch(
          '/api/admin/invitations/status',
          { id: row.id, ownerId: row.ownerId, status },
          { withCredentials: true },
        );
      } catch {
        // Realtime listener will reflect current state; optional: show toast
      }
    },
    [],
  );

  const columns = getAdminInvitationsColumns(lang, handleStatusChange);

  if (loading && invitations.length === 0) {
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
        <Table
          rows={invitations}
          columns={columns}
          loading={loading}
          disableRowSelectionOnClick
          getRowId={(row) => `${row.ownerId}_${row.id}`}
        />
      </Box>
    </AdminGuard>
  );
};

export default function AdminInvitationsPage() {
  return (
    <AdminInvitationsProvider>
      <AdminInvitationsInner />
    </AdminInvitationsProvider>
  );
}
