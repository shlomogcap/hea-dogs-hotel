import { ILang } from '@/lib/consts/displayTexts';

export enum EUserProfileFields {
  Name = 'name',
  MainEmail = 'mainEmail',
  MainPhone = 'mainPhone',
}

export const formTitle: Record<ILang, string> = {
  he: 'פרופיל משתמש',
  en: 'User Profile',
};

export const fields: Record<ILang, Record<EUserProfileFields, string>> = {
  he: {
    [EUserProfileFields.Name]: 'שם',
    [EUserProfileFields.MainEmail]: 'אימייל',
    [EUserProfileFields.MainPhone]: 'טלפון',
  },
  en: {
    [EUserProfileFields.Name]: 'Name',
    [EUserProfileFields.MainEmail]: 'Email',
    [EUserProfileFields.MainPhone]: 'Phone',
  },
};
