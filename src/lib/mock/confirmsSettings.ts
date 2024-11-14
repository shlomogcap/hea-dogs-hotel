import { ITableRow } from '../components/commons/Table';
import { ECommonFields } from '../consts/commonFields';
import { EConfirmFields } from '../consts/confirms/ConfirmFields';
import { EConfirmType } from '../consts/confirms/ConfirmType';
import { IWithPathField } from './utils';

const PATH_FIELD = 'path';
//TODO: populated from db/client/userRoles
enum UserRoles {
  SYSTEM = 'system',
  OWNER = 'owner',
  CEO_OPERATIONS = 'ceoOperations',
  CEO_FINANCE = 'ceoFinance',
  COMPANY_ENGINEER = 'companyEngineer',
  BUDGETER = 'budgeter',
  SECRETARY = 'secretary',
  ACCOUNTS_OPERATIONS = 'accountsOperations',
  ACCOUNTS_ENTREPRENEURSHIP = 'accountsEntrepreneurship',
  ACCOUNTS = 'accounts',
  AREA_MANAGER = 'areaManager',
  PROJECT_MANAGER = 'projectManager',
  SITE_MANAGER = 'siteManager',
  TENANT_CHANGES_MANAGER = 'tenantChangesManager',
  TENANT_CHANGES_COORDINATOR = 'tenantChangesCoordinator',
  INHOUSE_TENANT_CHANGES_COORDINATOR = 'inhouseTenantChangesCoordinator',
  PROCUREMENT = 'procurement',
  ACCOUNTS_OUTSOURCE = 'accountsOutsource',
  OUTSOURCE_COORDINATOR = 'outsourceCoordinator',
}

export const MOCK_CONFIRMS_SETTINGS_DATA: IWithPathField<
  ITableRow<EConfirmFields>
>[] = [
  {
    [ECommonFields.Id]: 'start',
    [PATH_FIELD]: 'projects/1',
    [EConfirmFields.OrderIndex]: 1,
    [EConfirmFields.UserRole]: [
      UserRoles.PROJECT_MANAGER,
      UserRoles.AREA_MANAGER,
    ],
    [EConfirmFields.ConfirmType]: EConfirmType.Actual,
    [EConfirmFields.Title]: 'אתחול ועדכון',
    [EConfirmFields.NextConfirm]: 'projectManager',
    [EConfirmFields.Due]: 10,
  },
  {
    [ECommonFields.Id]: 'projectManager',
    [PATH_FIELD]: 'projects/1',
    [EConfirmFields.OrderIndex]: 2,
    [EConfirmFields.UserRole]: [
      UserRoles.PROJECT_MANAGER,
      UserRoles.AREA_MANAGER,
    ],
    [EConfirmFields.ConfirmType]: EConfirmType.Actual,
    [EConfirmFields.Title]: 'אישור מ.פרוייקט',
    [EConfirmFields.NextConfirm]: 'manager',
    [EConfirmFields.Due]: 10,
  },
  {
    [ECommonFields.Id]: 'manager',
    [PATH_FIELD]: 'projects/1',
    [EConfirmFields.OrderIndex]: 3,
    [EConfirmFields.UserRole]: [
      UserRoles.COMPANY_ENGINEER,
      UserRoles.CEO_OPERATIONS,
    ],
    [EConfirmFields.ConfirmType]: EConfirmType.Actual,
    [EConfirmFields.Title]: 'אישור מהנדס חברה / מנכל',
    [EConfirmFields.NextConfirm]: 'accounts',
    [EConfirmFields.Due]: 15,
  },
  {
    [ECommonFields.Id]: 'accounts',
    [PATH_FIELD]: 'projects/1',
    [EConfirmFields.OrderIndex]: 4,
    [EConfirmFields.UserRole]: [
      UserRoles.ACCOUNTS_OPERATIONS,
      UserRoles.ACCOUNTS_ENTREPRENEURSHIP,
    ],
    [EConfirmFields.ConfirmType]: EConfirmType.Billing,
    [EConfirmFields.Title]: 'אישור הנה"ח',
    [EConfirmFields.NextConfirm]: 'finance',
    [EConfirmFields.Due]: 18,
  },
  {
    [ECommonFields.Id]: 'finance',
    [PATH_FIELD]: 'projects/1',
    [EConfirmFields.OrderIndex]: 5,
    [EConfirmFields.UserRole]: [UserRoles.BUDGETER, UserRoles.CEO_FINANCE],
    [EConfirmFields.ConfirmType]: EConfirmType.Billing,
    [EConfirmFields.Title]: 'אישור כספים',
    [EConfirmFields.NextConfirm]: 'SAP',
    [EConfirmFields.Due]: 20,
  },
  {
    [ECommonFields.Id]: 'SAP',
    [PATH_FIELD]: 'projects/1',
    [EConfirmFields.OrderIndex]: 6,
    [EConfirmFields.UserRole]: [
      UserRoles.ACCOUNTS_OPERATIONS,
      UserRoles.ACCOUNTS_ENTREPRENEURSHIP,
    ],
    [EConfirmFields.ConfirmType]: EConfirmType.Billing,
    [EConfirmFields.Title]: 'הזנה לסאפ',
    [EConfirmFields.NextConfirm]: 'billing',
    [EConfirmFields.Due]: 22,
  },
  {
    [ECommonFields.Id]: 'billing',
    [PATH_FIELD]: 'projects/1',
    [EConfirmFields.OrderIndex]: 7,
    [EConfirmFields.UserRole]: [
      UserRoles.ACCOUNTS_OPERATIONS,
      UserRoles.ACCOUNTS_ENTREPRENEURSHIP,
    ],
    [EConfirmFields.ConfirmType]: EConfirmType.Billing,
    [EConfirmFields.Title]: "צ'ק מאושר",
    [EConfirmFields.NextConfirm]: 'end',
    [EConfirmFields.Due]: 23,
  },
];
