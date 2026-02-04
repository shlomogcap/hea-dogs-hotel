import { ILang } from '@/lib/consts/displayTexts';

export enum ELoginFields {
  Email = 'email',
  Password = 'password',
  ConfirmPassword = 'confirmPassword',
}

export enum ELoginActions {
  Login = 'login',
  SignUp = 'signUp',
  ForgotPassword = 'forgotPassword',
}

export type AuthModalMode = 'signin' | 'signup';

type IDisplayTextMapping = {
  signinTitle: string;
  signupTitle: string;
  fields: Record<ELoginFields, string>;
  actions: Record<ELoginActions, string>;
  switchToSignUp: string;
  switchToSignIn: string;
};

export const LOGIN_DISPLAY_TEXTS: Record<ILang, IDisplayTextMapping> = {
  he: {
    signinTitle: 'כניסה',
    signupTitle: 'הרשמה',
    fields: {
      [ELoginFields.Email]: 'אימייל',
      [ELoginFields.Password]: 'סיסמא',
      [ELoginFields.ConfirmPassword]: 'אימות סיסמא',
    },
    actions: {
      [ELoginActions.Login]: 'התחבר',
      [ELoginActions.SignUp]: 'הירשם',
      [ELoginActions.ForgotPassword]: 'שכחתי סיסמא',
    },
    switchToSignUp: 'אין לך חשבון? הירשם',
    switchToSignIn: 'כבר יש לך חשבון? התחבר',
  },
  en: {
    signinTitle: 'Sign in',
    signupTitle: 'Sign up',
    fields: {
      [ELoginFields.Email]: 'Email',
      [ELoginFields.Password]: 'Password',
      [ELoginFields.ConfirmPassword]: 'Confirm password',
    },
    actions: {
      [ELoginActions.Login]: 'Sign in',
      [ELoginActions.SignUp]: 'Sign up',
      [ELoginActions.ForgotPassword]: 'Forgot password',
    },
    switchToSignUp: "Don't have an account? Sign up",
    switchToSignIn: 'Already have an account? Sign in',
  },
};
