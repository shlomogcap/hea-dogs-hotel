import { ITableRow } from '../components/commons/Table';
import { ECommonFields } from '../consts/commonFields';
import {
  EContractFields,
  EContractActualStatus,
  EContractType,
  EContractStatus,
  EContractCalculationMethod,
} from '../consts/contracts';

const PATH_FIELD = 'path';

type IWithPathField<T> = T & { [PATH_FIELD]: string };

export const MOCK_CONTRACTS_DATA: IWithPathField<ITableRow<EContractFields>>[] =
  [
    {
      [ECommonFields.Id]: '1',
      [PATH_FIELD]: 'projects/1',
      [EContractFields.Title]: 'חיפוי וריצוף מדוקק',
      [EContractFields.Description]: '',
      [EContractFields.BudgetbudgetaryItem]: '9.1',
      [EContractFields.ActualsStatus]: EContractActualStatus.InCareOfAccounting,
      [EContractFields.VendorRef]: 'vendors/1',
      [EContractFields.TotalAgreementSum]: 119_000,
      [EContractFields.PaymentDelay]: 18,
      [EContractFields.ContractType]: EContractType.Amount,
      [EContractFields.DelayPercentage]: 0.05,
      [EContractFields.Status]: EContractStatus.Plan,
      [EContractFields.IsIndexed]: true,
      [EContractFields.IndexedFactor]: '',
      [EContractFields.IndexedPercentage]: 0.02,
      [EContractFields.CalculationMethod]: EContractCalculationMethod.Amount,
      [EContractFields.SWorkDate]: '2023-05-05',
      [EContractFields.NumberOfPeriods]: 12,
      [EContractFields.EWorkDate]: '2024-05-05',
      [EContractFields.DonePercentage]: 0.53,
      [EContractFields.TotalActualsSum]: 63_000,
    },
    {
      [ECommonFields.Id]: '2',
      [PATH_FIELD]: 'projects/1',
      [EContractFields.Title]: 'מיזוג אוויר',
      [EContractFields.Description]: '',
      [EContractFields.BudgetbudgetaryItem]: '4',
      [EContractFields.ActualsStatus]: EContractActualStatus.None,
      [EContractFields.VendorRef]: 'vendors/1',
      [EContractFields.TotalAgreementSum]: 859_558,
      [EContractFields.PaymentDelay]: 60,
      [EContractFields.ContractType]: EContractType.Pauschal,
      [EContractFields.DelayPercentage]: 0.05,
      [EContractFields.Status]: EContractStatus.Plan,
      [EContractFields.IsIndexed]: false,
      [EContractFields.IndexedFactor]: '',
      [EContractFields.IndexedPercentage]: 0.02,
      [EContractFields.CalculationMethod]: EContractCalculationMethod.Pauschal,
      [EContractFields.SWorkDate]: '2023-05-05',
      [EContractFields.NumberOfPeriods]: 12,
      [EContractFields.EWorkDate]: '2024-05-05',
      [EContractFields.DonePercentage]: 0.53,
      [EContractFields.TotalActualsSum]: 772_767,
    },
  ];
