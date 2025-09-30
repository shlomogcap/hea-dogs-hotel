import { IDogDoc } from '@/pages/api/dogs/create';
import { TableColumn } from '../common/Table/Table';
import { ILang } from '@/lib/consts/displayTexts';

type DogsLabelsFields = keyof IDogDoc;

export const DOGS_LABELS: Record<ILang, Record<DogsLabelsFields, string>> = {
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

const DOGS_COLUMNS: Partial<Record<DogsLabelsFields, TableColumnNoField>> = {
  dogName: {
    width: 150,
    align,
  },
  dogGender: {
    width: 150,
    align,
    type: 'singleSelect',
  },
  dogAge: { width: 150, align },
  dogBread: { width: 150, align },
  dogPhysicalDescription: { width: 150, align },
  dogId: { width: 150, align },
};

const getColumns = (lang: ILang) =>
  Object.entries(DOGS_COLUMNS).map(([k, v]) => ({
    ...v,
    field: k,
    headerName: DOGS_LABELS[lang][k as DogsLabelsFields],
  })) as TableColumn[];

export default getColumns;
