import type { ILang } from './displayTexts';

export type ToastMessageKey =
  | 'invitationCreated'
  | 'invitationCreateFailed'
  | 'invitationNotLoaded'
  | 'invitationUpdated'
  | 'invitationUpdateFailed'
  | 'dogCreated'
  | 'dogCreateFailed'
  | 'dogCreatedAndAttached'
  | 'dogNotLoaded'
  | 'dogUpdated'
  | 'dogSaveFailed'
  | 'profileUpdated'
  | 'profileUpdateFailed'
  | 'invitationAtLeastOneDogRequired'
  | 'errorOccurred';

/** Success toasts (no placeholder) */
const SUCCESS: Record<
  Exclude<
    ToastMessageKey,
    | 'invitationCreateFailed'
    | 'invitationUpdateFailed'
    | 'invitationNotLoaded'
    | 'dogCreateFailed'
    | 'dogSaveFailed'
    | 'dogNotLoaded'
    | 'profileUpdateFailed'
    | 'invitationAtLeastOneDogRequired'
    | 'errorOccurred'
  >,
  Record<ILang, string>
> = {
  invitationCreated: {
    he: 'ההזמנה נוצרה בהצלחה',
    en: 'Invitation created successfully',
  },
  invitationUpdated: {
    he: 'ההזמנה עודכנה',
    en: 'Invitation updated',
  },
  dogCreated: {
    he: 'הכלב נוצר בהצלחה',
    en: 'Dog created successfully',
  },
  dogCreatedAndAttached: {
    he: 'הכלב נוצר וצורף להזמנה',
    en: 'Dog created and attached',
  },
  dogUpdated: {
    he: 'הכלב עודכן בהצלחה',
    en: 'Dog updated successfully',
  },
  profileUpdated: {
    he: 'הפרופיל עודכן בהצלחה',
    en: 'Profile updated successfully',
  },
};

/** Error toasts: use {detail} in the string for dynamic message */
const ERROR: Record<
  | 'invitationCreateFailed'
  | 'invitationUpdateFailed'
  | 'invitationNotLoaded'
  | 'dogCreateFailed'
  | 'dogSaveFailed'
  | 'dogNotLoaded'
  | 'profileUpdateFailed'
  | 'invitationAtLeastOneDogRequired'
  | 'errorOccurred',
  Record<ILang, string>
> = {
  invitationNotLoaded: {
    he: 'ההזמנה לא נטענה',
    en: 'Invitation not loaded',
  },
  dogNotLoaded: {
    he: 'הכלב לא נטען',
    en: 'Dog not loaded',
  },
  invitationAtLeastOneDogRequired: {
    he: 'נדרש לכל הפחות כלב אחד בהזמנה',
    en: 'At least one dog is required on the invitation',
  },
  invitationCreateFailed: {
    he: 'יצירת ההזמנה נכשלה: {detail}',
    en: 'Invitation failed to create: {detail}',
  },
  invitationUpdateFailed: {
    he: 'עדכון ההזמנה נכשל: {detail}',
    en: 'Failed to update: {detail}',
  },
  dogCreateFailed: {
    he: 'יצירת הכלב נכשלה: {detail}',
    en: 'Failed to create dog: {detail}',
  },
  dogSaveFailed: {
    he: 'שמירת הכלב נכשלה: {detail}',
    en: 'Failed to save dog: {detail}',
  },
  profileUpdateFailed: {
    he: 'עדכון הפרופיל נכשל',
    en: 'Update not success',
  },
  errorOccurred: {
    he: 'אירעה שגיאה',
    en: 'An error occurred',
  },
};

export const TOAST_MESSAGES = {
  success: SUCCESS,
  error: ERROR,
} as const;

export function getToastMessage(
  type: 'success' | 'error',
  key: ToastMessageKey,
  lang: ILang,
  detail?: string,
): string {
  const messages =
    type === 'success'
      ? (TOAST_MESSAGES.success as Record<string, Record<ILang, string>>)
      : (TOAST_MESSAGES.error as Record<string, Record<ILang, string>>);
  const template = messages[key]?.[lang] ?? messages[key]?.en ?? String(key);
  return detail != null ? template.replace('{detail}', detail) : template;
}
