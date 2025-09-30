import { ILang } from '@/lib/consts/displayTexts';

export enum EDogFormFields {
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

type DisplayTexts = {
  formFields: Record<ILang, Record<EDogFormFields, string>>;
  genderOptions: Record<ILang, { value: EGenderEnum; label: string }[]>;
};

export const DISPLAY_TEXTS: DisplayTexts = {
  formFields: {
    he: {
      [EDogFormFields.DogName]: 'שם הכלב',
      [EDogFormFields.DogGender]: 'מין הכלב',
      [EDogFormFields.DogBread]: 'גזע',
      [EDogFormFields.DogAge]: 'גיל',
      [EDogFormFields.DogPhysicalDescription]: 'תיאור חיצוני',
    },
    en: {
      [EDogFormFields.DogName]: 'Dog Name',
      [EDogFormFields.DogGender]: 'Gender',
      [EDogFormFields.DogBread]: 'Breed',
      [EDogFormFields.DogAge]: 'Age',
      [EDogFormFields.DogPhysicalDescription]: 'Physical Description',
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
