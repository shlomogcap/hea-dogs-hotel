import { ECommonFields } from '../consts/commonFields';

export type IWithIdField<T extends object> = T & { [ECommonFields.Id]: string };

export type IWithCommonFields<T extends object> = T & {
  [key in ECommonFields]?: string;
};

export type IWithCreationFields<T extends object> = Omit<
  T,
  ECommonFields.Id | ECommonFields.Path
>;
