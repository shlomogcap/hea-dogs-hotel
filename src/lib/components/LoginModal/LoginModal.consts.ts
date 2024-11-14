import { ILang } from '@/lib/consts/displayTexts';

export enum ELoginFields {
  Email = 'email',
  Password = 'passowrd',
}
export enum ELoginActions {
  Login = 'login',
  ForgatPassword = 'forgaPassword',
}

type IDisplayTextMapping = {
  title: string;
  fields: Record<ELoginFields, string>;
  actions: Record<ELoginActions, string>;
};

export const LOGIN_DISPLAY_TEXTS: Record<ILang, IDisplayTextMapping> = {
  he: {
    title: 'כניסה',
    fields: {
      [ELoginFields.Email]: 'אימייל',
      [ELoginFields.Password]: 'סיסמא',
    },
    actions: {
      [ELoginActions.Login]: 'התחבר',
      [ELoginActions.ForgatPassword]: 'שכחתי סיסמא',
    },
  },
  en: {
    title: 'Login',
    fields: {
      [ELoginFields.Email]: 'Email',
      [ELoginFields.Password]: 'Password',
    },
    actions: {
      [ELoginActions.Login]: 'Login',
      [ELoginActions.ForgatPassword]: 'Forgat Password',
    },
  },
};
