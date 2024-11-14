import { ITableRow } from '../components/commons/Table';
import { ECommonFields } from '../consts/commonFields';
import { EProjectAccountsFields } from '../consts/accounts';

export const MOCK_PROJECTS_ACCOUNTS_DATA: ITableRow<EProjectAccountsFields>[] =
  [
    {
      [ECommonFields.Id]: '1',
      [EProjectAccountsFields.Contract]: '1',
      [EProjectAccountsFields.Vendor]: '1',
      [EProjectAccountsFields.AccumulatedTotal]: 63_000,
      [EProjectAccountsFields.AccumulatedHisotry]: 0,
      [EProjectAccountsFields.AccountAdditions]: 0,
      [EProjectAccountsFields.AccountSubtractions]: 0,
      [EProjectAccountsFields.AccountPeriod]: '04 2023',
      [EProjectAccountsFields.AccountToPay]: 63_000,
      [EProjectAccountsFields.ContractSum]: 119_000,
      [EProjectAccountsFields.TotalAdditionsSubtractions]: 0,
      [EProjectAccountsFields.TotalToPay]: 56_000,
      [EProjectAccountsFields.PaidPercentage]: 0.53,
    },
    {
      [ECommonFields.Id]: '2',
      [EProjectAccountsFields.Contract]: '2',
      [EProjectAccountsFields.Vendor]: '2',
      [EProjectAccountsFields.AccumulatedTotal]: 120_425,
      [EProjectAccountsFields.AccumulatedHisotry]: 34_220,
      [EProjectAccountsFields.AccountAdditions]: 0,
      [EProjectAccountsFields.AccountSubtractions]: 0,
      [EProjectAccountsFields.AccountPeriod]: '01 2023',
      [EProjectAccountsFields.AccountToPay]: 86_205,
      [EProjectAccountsFields.ContractSum]: 82_000,
      [EProjectAccountsFields.TotalAdditionsSubtractions]: 48_707,
      [EProjectAccountsFields.TotalToPay]: -38_425,
      [EProjectAccountsFields.PaidPercentage]: 1.47,
    },
  ];
