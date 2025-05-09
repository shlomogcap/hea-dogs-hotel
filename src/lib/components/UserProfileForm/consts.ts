import { ILang } from '@/lib/consts/displayTexts';

export enum EUserProfileFields {
  Name = 'name',
  MainEmail = 'mainEmail',
  MainPhone = 'mainPhone',
  Comments = 'comments',
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
    [EUserProfileFields.Comments]: 'הערות',
  },
  en: {
    [EUserProfileFields.Name]: 'Name',
    [EUserProfileFields.MainEmail]: 'Email',
    [EUserProfileFields.MainPhone]: 'Phone',
    [EUserProfileFields.Comments]: 'Comments',
  },
};
