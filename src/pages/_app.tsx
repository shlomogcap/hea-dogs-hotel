import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';
import { UsersProvider } from '@/lib/context/usersContext';
import { ModalProvider } from '@/lib/context/ModalProvider';
import { ILoginModalData, LoginModal } from '@/lib/components/LoginModal';
import { useAuth } from '@/lib/hooks/useAuth';
import { IUsePreferences, UserProvider } from '@/lib/context/userContext';
import { ToastContainer } from 'react-toastify';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import BasePage from '@/lib/components/BasePage';

export default function App({ Component, pageProps }: AppProps) {
  const [userPreferences] = useState<IUsePreferences>({
    lang: 'he',
  });
  const { user, loading, error } = useAuth();
  return (
    <>
      <Head>
        <title>HEA Dogs Hotel</title>
        <meta name='description' content='HEA Dogs Hotel App' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <CssBaseline />
      <UserProvider
        value={{
          data: user,
          isLoading: loading,
          error,
          preferences: userPreferences,
        }}
      >
        <UsersProvider>
          <ModalProvider>
            <ToastContainer position='top-center' closeOnClick={false} />
            <BasePage>
              {loading ? 'Loading...' : <Component {...pageProps} />}
              {!user && !loading && <LoginModal {...({} as ILoginModalData)} />}
            </BasePage>
          </ModalProvider>
        </UsersProvider>
      </UserProvider>
    </>
  );
}
