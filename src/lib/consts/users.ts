export enum EUserFields {
  Id = 'id',
  Name = 'name',
  Phone = 'phone',
  Email = 'email',
  Role = 'role',
}

export type IUserDoc = {
  [EUserFields.Id]: string;
  [EUserFields.Name]: string;
  [EUserFields.Email]: string;
  [EUserFields.Role]: string;
};
