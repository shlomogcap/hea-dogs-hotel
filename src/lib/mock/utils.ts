export const PATH_FIELD = 'path';

export type IWithPathField<T> = T & { [PATH_FIELD]: string };
