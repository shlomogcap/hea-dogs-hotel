import { IDogDoc } from '@/pages/api/dogs/create';
import { IInvitationDoc } from '@/pages/api/invitation/create';
import { TableColumn } from '../common/Table/Table';
import { ILang } from '@/lib/consts/displayTexts';
import {
  EInvitationStatus,
  INVITATION_STATUS_LABELS,
  INVITATION_STATUS_COLORS,
} from '../InvitationForm/consts';
import dayjs from 'dayjs';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import type { InvitationStatus } from '@/pages/api/invitation/create';
import type { AdminInvitationItem } from '@/pages/api/admin/invitations';

const ADMIN_INVITATION_LABELS: Record<
  ILang,
  Record<
    | keyof IInvitationDoc
    | 'dogsNames'
    | 'durationDays'
    | 'entryDate'
    | 'exitDate'
    | 'documentId',
    string
  >
> = {
  he: {
    id: '#',
    ownerName: 'שם בעלים',
    ownerId: 'מזהה בעלים',
    phone: 'טלפון נייד',
    email: 'אימייל',
    status: 'סטטוס',
    startDate: 'תאריך התחלה',
    endDate: 'תאריך סיום',
    entryDate: 'תאריך כניסה לפנסיון',
    exitDate: 'תאריך יציאה מהפנסיון',
    sHour: 'שעת התחלה',
    eHour: 'שעת סיום',
    dogs: 'פרטי כלבים',
    dogsNames: 'שם הכלב',
    durationDays: 'משך (ימים)',
    documentId: 'מזהה הזמנה',
  },
  en: {
    id: '#',
    ownerName: 'Owner Name',
    ownerId: 'Owner ID',
    phone: 'Mobile Phone',
    email: 'Email',
    status: 'Status',
    startDate: 'Start Date',
    endDate: 'End Date',
    entryDate: 'Entry Date',
    exitDate: 'Exit Date',
    sHour: 'Start Hour',
    eHour: 'End Hour',
    dogs: 'Dogs',
    dogsNames: 'Dog Name',
    durationDays: 'Duration (days)',
    documentId: 'Document ID',
  },
};

const align = (lang: ILang) => (lang === 'he' ? 'right' : 'left');

const STATUS_OPTIONS: EInvitationStatus[] = [
  EInvitationStatus.Draft,
  EInvitationStatus.SendForConfirmation,
  EInvitationStatus.Confirmed,
  EInvitationStatus.Canceled,
  EInvitationStatus.Done,
];

export type OnAdminStatusChange = (
  row: AdminInvitationItem,
  status: InvitationStatus,
) => void;

export const getAdminInvitationsColumns = (
  lang: ILang,
  onStatusChange: OnAdminStatusChange,
): TableColumn[] => {
  const a = align(lang);
  const labels = ADMIN_INVITATION_LABELS[lang];
  return [
    {
      field: 'ownerName',
      headerName: labels.ownerName,
      width: 140,
      align: a,
    },
    {
      field: 'phone',
      headerName: labels.phone,
      width: 120,
      align: a,
    },
    {
      field: 'email',
      headerName: labels.email,
      width: 180,
      align: a,
    },
    {
      field: 'dogsNames',
      headerName: labels.dogsNames,
      width: 140,
      align: a,
      valueGetter: (_value: unknown, row: AdminInvitationItem) =>
        row?.dogs?.map((d: IDogDoc) => d.dogName).join(', ') ?? '-',
    },
    {
      field: 'startDate',
      headerName: labels.entryDate,
      width: 150,
      align: a,
      type: 'date',
      valueGetter: (value: unknown) =>
        value ? new Date(value as string) : null,
    },
    {
      field: 'endDate',
      headerName: labels.exitDate,
      width: 150,
      align: a,
      type: 'date',
      valueGetter: (value: unknown) =>
        value ? new Date(value as string) : null,
    },
    {
      field: 'durationDays',
      headerName: labels.durationDays,
      width: 100,
      align: a,
      valueGetter: (_value: unknown, row: AdminInvitationItem) => {
        const start = row?.startDate;
        const end = row?.endDate;
        if (!start || !end) return '-';
        const days = dayjs(end).diff(dayjs(start), 'day');
        return lang === 'he' ? `${days} ימים` : `${days} days`;
      },
    },
    {
      field: 'id',
      headerName: labels.documentId,
      width: 120,
      align: a,
    },
    {
      field: 'status',
      headerName: labels.status,
      width: 160,
      align: a,
      renderCell: (params) => {
        const value = (params.value as InvitationStatus | undefined) ?? 'draft';
        const row = params.row as AdminInvitationItem;
        return (
          <Select
            size='small'
            value={value}
            variant='outlined'
            sx={{ minWidth: 120 }}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              e.stopPropagation();
              onStatusChange(row, e.target.value as InvitationStatus);
            }}
            renderValue={(v) => {
              const label =
                INVITATION_STATUS_LABELS[lang][v as EInvitationStatus];
              const color = INVITATION_STATUS_COLORS[v as EInvitationStatus];
              return (
                <Chip
                  label={label}
                  color={
                    color as
                      | 'default'
                      | 'primary'
                      | 'error'
                      | 'info'
                      | 'success'
                  }
                  size='small'
                  variant='outlined'
                />
              );
            }}
          >
            {STATUS_OPTIONS.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {INVITATION_STATUS_LABELS[lang][opt]}
              </MenuItem>
            ))}
          </Select>
        );
      },
    },
  ];
};
