import { ILang } from '@/lib/consts/displayTexts';

export enum EInvitationFormSections {
  OwnerDetails = 'ownerDetails',
  DogDetails = 'dogDetails',
  InvitationDetails = 'invitationDetails',
}
export enum EInvitationFormFields {
  OwnerName = 'ownerName',
  OwnerId = 'ownerId',
  Phone = 'phone',
  Email = 'email',
  SDate = 'startDate',
  EDate = 'endDate',
  SHour = 'sHour',
  EHour = 'eHour',
  DogName = 'dogName',
  DogGender = 'dogGender',
  DogBread = 'dogBread',
  DogAge = 'dogAge',
  DogPhysicalDescription = 'dogPhysicalDescription',
}
export enum EGenderEnum {
  Male = 'Male',
  Female = 'Female',
  NeuteredMale = 'NeuteredMale',
  SpayedFemale = 'SpayedFemale',
}

type DispalyText = {
  formFields: Record<ILang, Record<EInvitationFormFields, string>>;
  formSections: Record<ILang, Record<EInvitationFormSections, string>>;
  genderOptions: Record<ILang, { value: EGenderEnum; label: string }[]>;
};

export const DISPLAY_TEXTS: DispalyText = {
  formFields: {
    he: {
      [EInvitationFormFields.OwnerName]: 'שם הבעלים',
      [EInvitationFormFields.OwnerId]: 'ת.ז. בעלים',
      [EInvitationFormFields.Phone]: 'טלפון',
      [EInvitationFormFields.Email]: 'אימייל',
      [EInvitationFormFields.SDate]: 'תאריך כניסה',
      [EInvitationFormFields.EDate]: 'תאריך יציאה',
      [EInvitationFormFields.SHour]: 'שעת כניסה',
      [EInvitationFormFields.EHour]: 'שעת יציאה',
      [EInvitationFormFields.DogName]: 'שם הכלב',
      [EInvitationFormFields.DogGender]: 'מין הכלב',
      [EInvitationFormFields.DogBread]: 'גזע',
      [EInvitationFormFields.DogAge]: 'גיל',
      [EInvitationFormFields.DogPhysicalDescription]: 'תיאור חיצוני',
    },
    en: {
      [EInvitationFormFields.OwnerName]: 'Owner Name',
      [EInvitationFormFields.OwnerId]: 'Owner Name',
      [EInvitationFormFields.Phone]: 'Phone',
      [EInvitationFormFields.Email]: 'Email',
      [EInvitationFormFields.SDate]: 'Checkin Date',
      [EInvitationFormFields.EDate]: 'Checkout Date',
      [EInvitationFormFields.SHour]: 'Checkin Hour',
      [EInvitationFormFields.EHour]: 'Checkout Hour',
      [EInvitationFormFields.DogName]: 'Dog Name',
      [EInvitationFormFields.DogGender]: 'Dog Gender',
      [EInvitationFormFields.DogBread]: 'Breed',
      [EInvitationFormFields.DogAge]: 'Age',
      [EInvitationFormFields.DogPhysicalDescription]: 'Physical Description',
    },
  },
  formSections: {
    he: {
      [EInvitationFormSections.OwnerDetails]: 'פרטי הבעלים',
      [EInvitationFormSections.DogDetails]: 'פרטי הכלב/ים',
      [EInvitationFormSections.InvitationDetails]: 'פרטי ההזמנה',
    },
    en: {
      [EInvitationFormSections.OwnerDetails]: 'Owner Details',
      [EInvitationFormSections.DogDetails]: 'Dog Details',
      [EInvitationFormSections.InvitationDetails]: 'Invitation Details',
    },
  },
  genderOptions: {
    he: [
      { value: EGenderEnum.Male, label: 'זכר' },
      { value: EGenderEnum.Female, label: 'נקבה' },
      { value: EGenderEnum.NeuteredMale, label: 'זכר מסורס' },
      { value: EGenderEnum.SpayedFemale, label: 'נקבה מעוקרת' },
    ],
    en: [
      { value: EGenderEnum.Male, label: 'Male' },
      { value: EGenderEnum.Female, label: 'Female' },
      { value: EGenderEnum.NeuteredMale, label: 'Neutered Male' },
      { value: EGenderEnum.SpayedFemale, label: 'Spayed Female' },
    ],
  },
};
