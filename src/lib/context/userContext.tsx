import { createContext, useContext } from 'react';
import { User } from 'firebase/auth';
import { ILang } from '../consts/displayTexts';

type IUsePrefernces = {
  lang?: ILang;
};

type IUserContext = {
  data: User | null;
  preferences: IUsePrefernces;
  isLoading: boolean;
  error: string;
};

const UserContext = createContext<IUserContext>({
  data: null,
  isLoading: false,
  error: '',
});

export const useUserContext = () => useContext(UserContext);

export const UserProvider = UserContext.Provider;
