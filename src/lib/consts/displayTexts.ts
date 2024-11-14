import { ERoutesNames } from './routes';

export type ILang = 'he' | 'en';

export enum EButtonTexts {
  Save = 'save',
  Cancel = 'cancel',
  Add = 'add',
  Delete = 'delete',
  Duplicate = 'duplicate',
  AreYouSure = 'areYouSure',
  Approve = 'approve',
  Abort = 'abort',
}
export enum ETableStates {
  NoRows,
  Loading,
  Error,
}
export enum EToastType {
  AddingNewDoc,
  SavingDocData,
  DeletedDoc,
}
export enum EBoolean {
  False,
  True,
}

export enum EFilterPanelStates {
  Active,
  InActive,
  From,
  To,
  Filter,
  Reset,
  Close,
  Search,
}

type IDisplayTextMapping = {
  toasts: Record<EToastType, string>;
  routeNames: Record<ERoutesNames, string>;
  buttons: Record<EButtonTexts, string>;
  boolean: Record<EBoolean, string>;
};

export const DISPLAY_TEXTS: Record<ILang, IDisplayTextMapping> = {
  he: {
    boolean: {
      [EBoolean.False]: 'לא',
      [EBoolean.True]: 'כן',
    },
    toasts: {
      [EToastType.AddingNewDoc]: 'הנתונים נשמרו בהצלחה',
      [EToastType.SavingDocData]: 'הנתונים נשמרו בהצלחה',
      [EToastType.DeletedDoc]: 'פעולת מחיקה בוצעה בהצלחה',
    },
    buttons: {
      [EButtonTexts.Save]: 'שמור',
      [EButtonTexts.Cancel]: 'בטל שינויים',
      [EButtonTexts.Add]: 'הוספה',
      [EButtonTexts.Delete]: 'מחק',
      [EButtonTexts.Duplicate]: 'שכפל',
      [EButtonTexts.AreYouSure]: 'האם אתה בטוח?',
      [EButtonTexts.Approve]: 'אישור',
      [EButtonTexts.Abort]: 'ביטול',
    },
    routeNames: {
      [ERoutesNames.App]: 'פרוייקטים',
      [ERoutesNames.ProjectsWithType]: 'פרוייקטים',
      [ERoutesNames.Projects]: 'פרוייקטים',
      [ERoutesNames.Vendors]: 'קבלנים',
      [ERoutesNames.Settings]: 'הגדרות',
      [ERoutesNames.Project]: 'פרוייקט',
      [ERoutesNames.Contract]: 'חוזה',
      [ERoutesNames.Vendor]: 'קבלן',
      [ERoutesNames.Me]: 'המשתמש שלי',
      [ERoutesNames.Company]: 'פרטי חברה/חברות',
      [ERoutesNames.Budget]: 'פרקים תקציב',
      [ERoutesNames.NewVendor]: 'קבלן חדש',
      [ERoutesNames.NewProject]: 'פרויקט חדש',
      [ERoutesNames.SectionActual]: 'ביצוע סעיף',
      [ERoutesNames.NewContract]: 'חוזה חדש',
    },
  },
  en: {
    boolean: {
      [EBoolean.False]: 'No',
      [EBoolean.True]: 'Yes',
    },
    toasts: {
      [EToastType.AddingNewDoc]: 'Data Added Succesfully',
      [EToastType.SavingDocData]: 'Data Saved Succesfully',
      [EToastType.DeletedDoc]: 'Item Has Been Deleted Succesfully',
    },
    routeNames: {
      [ERoutesNames.App]: 'Projects',
      [ERoutesNames.Projects]: 'Projects',
      [ERoutesNames.ProjectsWithType]: 'Projects',
      [ERoutesNames.Vendors]: 'Vendors',
      [ERoutesNames.Settings]: 'Settings',
      [ERoutesNames.Project]: 'Project',
      [ERoutesNames.Contract]: 'Contract',
      [ERoutesNames.Vendor]: 'Vendor',
      [ERoutesNames.Me]: 'Me',
      [ERoutesNames.Company]: 'Company',
      [ERoutesNames.Budget]: 'Budget',
      [ERoutesNames.NewVendor]: 'New Vendor',
      [ERoutesNames.NewProject]: 'New Project',
      [ERoutesNames.SectionActual]: 'Section Actual',
      [ERoutesNames.NewContract]: 'New Contract',
    },
    buttons: {
      [EButtonTexts.Save]: 'Save',
      [EButtonTexts.Cancel]: 'Cancel',
      [EButtonTexts.Add]: 'Add',
      [EButtonTexts.Delete]: 'Delete',
      [EButtonTexts.Duplicate]: 'Duplicate',
      [EButtonTexts.AreYouSure]: 'Are You Sure?',
      [EButtonTexts.Approve]: 'Approve',
      [EButtonTexts.Abort]: 'Abort',
    },
  },
};
