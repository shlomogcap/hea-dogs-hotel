import { IDogDoc } from '@/pages/api/dogs/create';
import { IInvitationDoc } from '@/pages/api/invitation/create';
import { TableColumn } from '../common/Table/Table';
import { ILang } from '@/lib/consts/displayTexts';
import Chip from '@mui/material/Chip';
import {
  EInvitationStatus,
  INVITATION_STATUS_LABELS,
  INVITATION_STATUS_COLORS,
} from '../InvitationForm/consts';

type InvitationLabelsFields = keyof IInvitationDoc | 'dogsNames';

export const INVITATION_LABELS: Record<
  'en' | 'he',
  Record<InvitationLabelsFields, string>
> = {
  en: {
    id: '#',
    ownerName: 'Owner Name',
    ownerId: 'Owner ID',
    phone: 'Phone',
    email: 'Email',
    status: 'Status',
    startDate: 'Start Date',
    endDate: 'End Date',
    sHour: 'Start Hour',
    eHour: 'End Hour',
    dogs: 'Dogs',
    dogsNames: '',
  },
  he: {
    id: '#',
    ownerName: 'שם בעלים',
    ownerId: 'מזהה בעלים',
    phone: 'טלפון',
    email: 'אימייל',
    status: 'סטטוס',
    startDate: 'תאריך התחלה',
    endDate: 'תאריך סיום',
    sHour: 'שעת התחלה',
    eHour: 'שעת סיום',
    dogs: 'פרטי כלבים',
    dogsNames: '',
  },
};
export const DOGS_LABELS: Record<ILang, Record<keyof IDogDoc, string>> = {
  en: {
    id: '#',
    dogName: 'Dog Name',
    dogGender: 'Dog Gender',
    dogBread: 'Dog Breed',
    dogAge: 'Dog Age',
    dogPhysicalDescription: 'Dog Physical Description',
    dogId: '',
  },
  he: {
    id: '#',
    dogName: 'שם הכלב',
    dogGender: 'מין הכלב',
    dogBread: 'גזע הכלב',
    dogAge: 'גיל הכלב',
    dogPhysicalDescription: 'תיאור פיזי של הכלב',
    dogId: '',
  },
};

const lang: ILang = 'he';
const align = lang === 'he' ? 'right' : 'left';

type TableColumnNoField = Omit<TableColumn, 'field'>;

const getInvitationsColumns = (
  lang: ILang,
): Partial<Record<keyof IInvitationDoc, TableColumnNoField>> & {
  dogsNames: TableColumnNoField;
} => ({
  status: {
    width: 140,
    align,
    renderCell: (params) => {
      const value =
        (params.value as EInvitationStatus | undefined) ??
        EInvitationStatus.Draft;
      const label = INVITATION_STATUS_LABELS[lang][value];
      const color = INVITATION_STATUS_COLORS[value];
      return (
        <Chip
          label={label}
          color={color as 'default' | 'primary' | 'error' | 'info' | 'success'}
          size='small'
          variant='outlined'
        />
      );
    },
  },
  startDate: {
    width: 150,
    align,
    type: 'date',
    valueGetter: (value) => (value ? new Date(value) : ''),
  },
  endDate: {
    width: 150,
    align,
    type: 'date',
    valueGetter: (value) => (value ? new Date(value) : ''),
  },
  sHour: { width: 150, align },
  eHour: { width: 150, align },
  dogsNames: {
    width: 150,
    align,
    valueGetter: (row: any) =>
      row?.dogs?.map((d: IDogDoc) => d.dogName).join(', ') ?? '-',
  },
});

const getColumns = (lang: ILang) =>
  Object.entries(getInvitationsColumns(lang)).map(([k, v]) => ({
    ...v,
    field: k,
    headerName: INVITATION_LABELS[lang][k as keyof IInvitationDoc],
  })) as TableColumn[];

export default getColumns;
