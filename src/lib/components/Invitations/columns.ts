import { IDogDoc, IInvitationDoc } from '@/pages/api/invitation/create';
import { TableColumn } from '../common/Table/Table';

export const INVITATION_LABELS: Record<
  'en' | 'he',
  Record<keyof IInvitationDoc, string>
> = {
  en: {
    id: '#',
    ownerName: 'Owner Name',
    ownerId: 'Owner ID',
    phone: 'Phone',
    email: 'Email',
    startDate: 'Start Date',
    endDate: 'End Date',
    sHour: 'Start Hour',
    eHour: 'End Hour',
    dogs: 'Dogs',
  },
  he: {
    id: '#',
    ownerName: 'שם בעלים',
    ownerId: 'מזהה בעלים',
    phone: 'טלפון',
    email: 'אימייל',
    startDate: 'תאריך התחלה',
    endDate: 'תאריך סיום',
    sHour: 'שעת התחלה',
    eHour: 'שעת סיום',
    dogs: 'פרטי כלבים',
  },
};
export const DOGS_LABELS: Record<'en' | 'he', Record<keyof IDogDoc, string>> = {
  en: {
    id: '#',
    dogName: 'Dog Name',
    dogGender: 'Dog Gender',
    dogBread: 'Dog Breed',
    dogAge: 'Dog Age',
    dogPhysicalDescription: 'Dog Physical Description',
  },
  he: {
    id: '#',
    dogName: 'שם הכלב',
    dogGender: 'מין הכלב',
    dogBread: 'גזע הכלב',
    dogAge: 'גיל הכלב',
    dogPhysicalDescription: 'תיאור פיזי של הכלב',
  },
};

const lang: 'en' | 'he' = 'he';
const align = lang === 'he' ? 'right' : 'left';

type TableColumnNoField = Omit<TableColumn, 'field'>;

const INVITATIONS_COLUMNS: Partial<
  Record<keyof IInvitationDoc, TableColumnNoField>
> & { dogsNames: TableColumnNoField } = {
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
};

const getColumns = (lang: 'en' | 'he') =>
  Object.entries(INVITATIONS_COLUMNS).map(([k, v]) => ({
    ...v,
    field: k,
    headerName: INVITATION_LABELS[lang][k as keyof IInvitationDoc],
  })) as TableColumn[];

export default getColumns;
