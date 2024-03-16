import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { clearAuthToken, getAuthToken } from '../util/token-storage';
import { userAtom, userLoadingAtom } from '../lib/atoms/user.atom';
import { fetchUser } from '../lib/api/user.api';
import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-loading-skeleton/dist/skeleton.css';
import GenericLoading from '../components/shared-components/GenericLoading';
import Head from 'next/head';

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useAtom(userAtom);
  const [userLoading, setUserLoading] = useAtom(userLoadingAtom);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setUserLoading(true);
        try {
          const token = getAuthToken();
          if (token) {
            const data = await fetchUser();
            setUser(data);
          }
        } catch (err) {
          clearAuthToken();
        } finally {
          setUserLoading(false);
        }
      }
    };
    fetchUserData();
  }, [setUser, setUserLoading, user]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`app-container`}>{userLoading ? <GenericLoading /> : 
      <>
       <Head>
        <title>Listing</title>
        <meta name="description" content={`Best listings ever`} />
        <link rel="icon" href="/static/icon.png" sizes="any" />
      </Head>
      <Component {...pageProps} />
      </>
      }</div>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default MyApp;
