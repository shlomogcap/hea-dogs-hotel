import { IActualDoc } from '../consts/actuals/ActualDoc';
import { EActualFields } from '../consts/actuals/ActualFields';

type GetRelatedActualsBaseArgs = {
  unit?: number;
  currentAccountPeriod: number;
  sectionRef: string;
  actuals: IActualDoc[];
  getByUnit?: boolean;
};
type GetRelatedActualsArgs =
  | (GetRelatedActualsBaseArgs & { getByUnit: true; unit: number })
  | (GetRelatedActualsBaseArgs & {
      getByUnit?: false | undefined;
      unit?: undefined;
    });

export const getRelatedActuals = ({
  currentAccountPeriod,
  actuals,
  sectionRef,
  unit,
  getByUnit = false,
}: GetRelatedActualsArgs) =>
  actuals.filter(
    (actual) =>
      actual[EActualFields.SectionRef]?.startsWith(sectionRef) &&
      (!getByUnit || actual[EActualFields.Unit] === unit) &&
      actual[EActualFields.PeriodNumber] <= currentAccountPeriod,
  );
