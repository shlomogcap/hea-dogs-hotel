import { ECommonFields } from '../consts/commonFields';
import { ECompanyType } from '../consts/companyTypes';
import { EVendorFields } from '../consts/vendors';

export const MOCK_VENDORS_DATA = [
  {
    [ECommonFields.Id]: '1',
    [EVendorFields.Title]: 'אמניב',
    [EVendorFields.CommercialName]: 'אמניב',
    [EVendorFields.CompanyNumber]: '561506876',
    [EVendorFields.CompanExternalNumber]: '54654',
    [EVendorFields.CompanyType]: ECompanyType.PrivateCompany,
    [EVendorFields.Phone]: '053-1234568',
    [EVendorFields.Email]: 'foo@gmail.com',
    [EVendorFields.TaxesEndDate]: '2020-01-06',
    [EVendorFields.TaxPercent]: '5%',
    [EVendorFields.Address]: 'הנביאים 8 אשדוד',
    [EVendorFields.Description]: '',
    [EVendorFields.Status]: 'פעיל',
  },
  {
    [ECommonFields.Id]: '2',
    [EVendorFields.Title]: 'דוחובוני',
    [EVendorFields.CompanyNumber]: '561506876',
    [EVendorFields.CompanExternalNumber]: '8964565',
    [EVendorFields.CompanyType]: ECompanyType.PrivateCompany,
    [EVendorFields.Phone]: '053-68746546',
    [EVendorFields.Email]: 'asdf@gmail.com',
    [EVendorFields.TaxesEndDate]: '2023-01-06',
    [EVendorFields.TaxPercent]: '3.5%',
    [EVendorFields.Address]: 'הנביאים 8 חיפה',
    [EVendorFields.Description]: '',
    [EVendorFields.Status]: 'פעיל',
  },
  {
    [ECommonFields.Id]: '3',
    [EVendorFields.Title]: 'א.א. אביבי מטבחים (2004) בעמ',
    [EVendorFields.CompanyNumber]: '561506876',
    [EVendorFields.CompanExternalNumber]: '986546',
    [EVendorFields.CompanyType]: ECompanyType.PrivateCompany,
    [EVendorFields.Phone]: '053-6455458',
    [EVendorFields.Email]: 'sddd@gmail.com',
    [EVendorFields.TaxesEndDate]: '2020-01-09',
    [EVendorFields.TaxPercent]: '2.5%',
    [EVendorFields.Address]: 'הנביאים 8 קרית מוצקין',
    [EVendorFields.Description]: '',
    [EVendorFields.Status]: 'פעיל',
  },
];
