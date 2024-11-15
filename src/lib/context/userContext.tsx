import { createContext, useContext } from 'react';
import { User } from 'firebase/auth';
import { ILang } from '../consts/displayTexts';

export type IUsePreferences = {
  lang?: ILang;
};

type IUserContext = {
  data: User | null;
  preferences: IUsePreferences;
  isLoading: boolean;
  error: string;
};

const UserContext = createContext<IUserContext>({
  data: null,
  isLoading: false,
  error: '',
  preferences: {
    lang: 'he',
  },
});

export const useUserContext = () => useContext(UserContext);

export const UserProvider = UserContext.Provider;
