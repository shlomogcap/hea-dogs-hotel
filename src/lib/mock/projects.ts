import { ECommonFields } from '../consts/commonFields';
import { EProjectStatus, EProjectFields } from '../consts/projects';
import { EProjectType } from '../consts/projects/ProjectType';

export const MOCK_PROJECTS_DATA = [
  {
    [ECommonFields.Id]: '1',
    [EProjectFields.Title]: 'גליל ים',
    [EProjectFields.ProjectType]: EProjectType.Residential,
    [EProjectFields.SDate]: '2023-01-01',
    [EProjectFields.EDate]: '2024-01-01',
    [EProjectFields.TotalAgreementSum]: 200_000_000,
    [EProjectFields.TotalActualsSum]: 150_000_000,
    [EProjectFields.Address]: '',
    [EProjectFields.Status]: EProjectStatus.Active,
  },
  {
    [ECommonFields.Id]: '2',
    [EProjectFields.Title]: 'ברודצקי',
    [EProjectFields.ProjectType]: EProjectType.Residential,
    [EProjectFields.SDate]: '2023-05-05',
    [EProjectFields.EDate]: '2025-05-05',
    [EProjectFields.TotalAgreementSum]: 200_000_000,
    [EProjectFields.TotalActualsSum]: 150_000_000,
    [EProjectFields.Address]: '',
    [EProjectFields.Status]: EProjectStatus.NonActive,
  },
  {
    [ECommonFields.Id]: '3',
    [EProjectFields.Title]: 'רמת גן',
    [EProjectFields.ProjectType]: EProjectType.PublicSpace,
    [EProjectFields.SDate]: '2023-05-05',
    [EProjectFields.EDate]: '2025-05-05',
    [EProjectFields.TotalAgreementSum]: 200_000_000,
    [EProjectFields.TotalActualsSum]: 150_000_000,
    [EProjectFields.Address]: '',
    [EProjectFields.Status]: EProjectStatus.Active,
  },
];
