import { ITableRow } from '../components/commons/Table';
import {
  EActualCalcFields,
  EActualFields,
} from '../consts/actuals/ActualFields';
import { ECommonFields } from '../consts/commonFields';
import { PATH_FIELD, IWithPathField } from './utils';

export const MOCK_ACTUALS_DATA: IWithPathField<ITableRow<EActualFields>>[] = [
  {
    [ECommonFields.Id]: '1',
    [PATH_FIELD]: 'projects/1/contracts/1/sections/1',
    [EActualFields.Title]: 'תחילת חציבה',
    [EActualFields.SectionRef]:
      'projects/1/contracts/1/sections/1/milestones/1',
    [EActualFields.Calc]: {
      [EActualCalcFields._ModelId]: '',
      [EActualCalcFields._ActualsValue]: 0,
      [EActualCalcFields._ItemPrice]: 0,
      [EActualCalcFields._Price]: 0,
      [EActualCalcFields._Weight]: 0,
    },
    [EActualFields.CurrentTotal]: 0,
    [EActualFields.Unit]: 0,
    [EActualFields.Value]: 0,
  },
];
