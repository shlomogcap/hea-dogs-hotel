import dayjs from 'dayjs';
import { ILang } from '../consts/displayTexts';
import { IDateType } from './dateUtils';

enum EUnitDueSymbol {
  Days,
  D,
  W,
  Y,
}

enum EDueSymbol {
  OverDue,
  Due,
}

enum EAbsTimes {
  Today,
  Tommorow,
  Yesterday,
}

type Texts = Record<
  ILang,
  {
    absTimes: Record<EAbsTimes, string>;
    dueSymbol: Record<EDueSymbol, string>;
    unitDueSymbol: Record<EUnitDueSymbol, string>;
  }
>;

export const DATETIME_DUE_DISPLAY_TEXTS: Texts = {
  he: {
    absTimes: {
      [EAbsTimes.Today]: 'היום',
      [EAbsTimes.Tommorow]: 'מחר',
      [EAbsTimes.Yesterday]: 'אתמול',
    },
    dueSymbol: {
      [EDueSymbol.Due]: 'בעוד ',
      [EDueSymbol.OverDue]: 'לפני ',
    },
    unitDueSymbol: {
      [EUnitDueSymbol.Days]: ' ימים',
      [EUnitDueSymbol.D]: ' יום',
      [EUnitDueSymbol.W]: 'ש',
      [EUnitDueSymbol.Y]: 'שנה',
    },
  },
  en: {
    absTimes: {
      [EAbsTimes.Today]: 'Today',
      [EAbsTimes.Tommorow]: 'Tommorow',
      [EAbsTimes.Yesterday]: 'Yesterday',
    },
    dueSymbol: {
      [EDueSymbol.Due]: 'Due ',
      [EDueSymbol.OverDue]: 'Overdue ',
    },
    unitDueSymbol: {
      [EUnitDueSymbol.Days]: 'D',
      [EUnitDueSymbol.D]: 'D',
      [EUnitDueSymbol.W]: 'W',
      [EUnitDueSymbol.Y]: 'Y',
    },
  },
};

export type IDatetimeDueFormatOptions = {
  useHours?: boolean;
  fallback?: string;
  diffParam?: 'datesOnly' | 'weeks';
};

export const datetimeDueFormat = (
  datetime: IDateType,
  options?: IDatetimeDueFormatOptions,
) => {
  const {
    useHours = false,
    fallback = '---',
    diffParam = 'datesOnly',
  } = options ?? {};

  const dateObj = dayjs(datetime);
  const year = dateObj.get('year');
  const month = dateObj.get('month') + 1;
  const date = dateObj.get('date');

  if (isNaN(year) || isNaN(month) || isNaN(date) || dateObj.isValid()) {
    return fallback;
  }
  let d = String(date);
  let m = String(month);
  const y = String(year);

  if (month < 10) {
    m = '0' + m;
  }
  if (date < 10) {
    d = '0' + d;
  }

  const dist = dayjs().diff(date, 'days');
  const absDist = Math.abs(dist);
  let output = '';
  if (absDist < 7) {
    if (absDist === 0) {
      output = DATETIME_DUE_DISPLAY_TEXTS.he.absTimes[EAbsTimes.Today];
    } else {
      switch (dist) {
        case 1:
          output = DATETIME_DUE_DISPLAY_TEXTS.he.absTimes[EAbsTimes.Tommorow];
          break;
        case -1:
          output = DATETIME_DUE_DISPLAY_TEXTS.he.absTimes[EAbsTimes.Yesterday];
          break;
        default:
          if (dist < 0) {
            output = `${
              DATETIME_DUE_DISPLAY_TEXTS.he.dueSymbol[EDueSymbol.OverDue]
            }${absDist}${
              DATETIME_DUE_DISPLAY_TEXTS.he.unitDueSymbol[EUnitDueSymbol.Days]
            }`;
          } else {
            output = `${dist}${
              DATETIME_DUE_DISPLAY_TEXTS.he.unitDueSymbol[EUnitDueSymbol.Days]
            }`;
          }
      }
    }
  } else {
    if (diffParam === 'datesOnly') {
      output += d + '/' + m + '/' + y.toString().substring(2);
    } else if (diffParam === 'weeks') {
      const weeks = Math.floor(absDist / 7);
      const days = absDist % 7;
      if (dist < 0) {
        output += DATETIME_DUE_DISPLAY_TEXTS.he.dueSymbol[EDueSymbol.OverDue];
      }
      output += `${weeks}${
        DATETIME_DUE_DISPLAY_TEXTS.he.unitDueSymbol[EUnitDueSymbol.W]
      }`;
      if (days > 0) {
        output += ` (+${days})`;
      }
    } else {
      if (dist < 0) {
        output += DATETIME_DUE_DISPLAY_TEXTS.he.dueSymbol[EDueSymbol.OverDue];
      } else {
        output += DATETIME_DUE_DISPLAY_TEXTS.he.dueSymbol[EDueSymbol.Due];
      }
      output += `${absDist}${
        DATETIME_DUE_DISPLAY_TEXTS.he.unitDueSymbol[EUnitDueSymbol.D]
      }`;
    }
  }

  if (useHours) {
    const hours = dateObj.get('hour');
    const minutes = dateObj.get('minutes');
    const h = String(hours);
    let mm = String(minutes);
    if (minutes < 10) {
      mm = '0' + mm;
    }
    output += ` ${h}:${mm}`;
  }
  return output;
};
