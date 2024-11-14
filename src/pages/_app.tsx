import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';
import { UsersProvider } from '@/lib/context/usersContext';
import { ModalProvider } from '@/lib/context/ModalProvider';
import { ILoginModalData, LoginModal } from '@/lib/components/LoginModal';
import { useAuth } from '@/lib/hooks/useAuth';
import { UserProvider } from '@/lib/context/userContext';
import { ToastContainer } from 'react-toastify';
import CssBaseline from '@mui/material/CssBaseline';

export default function App({ Component, pageProps }: AppProps) {
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
      <UserProvider value={{ data: user, isLoading: loading, error }}>
        <UsersProvider>
          <ModalProvider>
            <ToastContainer position='top-center' closeOnClick={false} />
            {loading ? 'Loading...' : <Component {...pageProps} />}
            {!user && !loading && <LoginModal {...({} as ILoginModalData)} />}
          </ModalProvider>
        </UsersProvider>
      </UserProvider>
    </>
  );
}
