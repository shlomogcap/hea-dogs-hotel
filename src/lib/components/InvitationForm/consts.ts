import { ILang } from '@/lib/consts/displayTexts';

export enum EInvitationStatus {
  Draft = 'draft',
  SendForConfirmation = 'send_for_confirmation',
  Confirmed = 'confirmed',
  Canceled = 'canceled',
  Done = 'done',
}

export const INVITATION_STATUS_LABELS: Record<
  ILang,
  Record<EInvitationStatus, string>
> = {
  he: {
    [EInvitationStatus.Draft]: 'טיוטה',
    [EInvitationStatus.SendForConfirmation]: 'נשלח לאישור',
    [EInvitationStatus.Confirmed]: 'אושר',
    [EInvitationStatus.Canceled]: 'בוטל',
    [EInvitationStatus.Done]: 'הושלם',
  },
  en: {
    [EInvitationStatus.Draft]: 'Draft',
    [EInvitationStatus.SendForConfirmation]: 'Send for confirmation',
    [EInvitationStatus.Confirmed]: 'Confirmed',
    [EInvitationStatus.Canceled]: 'Canceled',
    [EInvitationStatus.Done]: 'Done',
  },
};

/** MUI color name or hex for Chip/display */
export const INVITATION_STATUS_COLORS: Record<EInvitationStatus, string> = {
  [EInvitationStatus.Draft]: 'default',
  [EInvitationStatus.SendForConfirmation]: 'info',
  [EInvitationStatus.Confirmed]: 'success',
  [EInvitationStatus.Canceled]: 'error',
  [EInvitationStatus.Done]: 'primary',
};

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
  Status = 'status',
  SDate = 'startDate',
  EDate = 'endDate',
  SHour = 'sHour',
  EHour = 'eHour',
  SelectDog = 'selectDog',
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
      [EInvitationFormFields.Status]: 'סטטוס',
      [EInvitationFormFields.SDate]: 'תאריך כניסה',
      [EInvitationFormFields.EDate]: 'תאריך יציאה',
      [EInvitationFormFields.SHour]: 'שעת כניסה',
      [EInvitationFormFields.EHour]: 'שעת יציאה',
      [EInvitationFormFields.SelectDog]: 'כלב',
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
      [EInvitationFormFields.Status]: 'Status',
      [EInvitationFormFields.SDate]: 'Checkin Date',
      [EInvitationFormFields.EDate]: 'Checkout Date',
      [EInvitationFormFields.SHour]: 'Checkin Hour',
      [EInvitationFormFields.EHour]: 'Checkout Hour',
      [EInvitationFormFields.SelectDog]: 'Dog',
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
