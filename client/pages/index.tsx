import { useAtom } from 'jotai';
import { NextPage } from 'next';
import AuthGuard from '../components/shared-components/AuthGuard';
import GenericLoading from '../components/shared-components/GenericLoading';
import { userAtom, userLoadingAtom } from '../lib/atoms/user.atom';
import LandingLayout from '../components/landing-components/LandingLayout';
import Header from '../components/header-components/Header';

const LandingIndex: NextPage = () => {
  const [user, setUser] = useAtom(userAtom);
  const [userLoading, setUserLoading] = useAtom(userLoadingAtom);
  

  return (
      <AuthGuard loggedInRedirectUrl="/dashboard">
        {user || userLoading ? (
          <GenericLoading />
        ) : (
          <>
            <Header />
            <div className="mb-4">
              <LandingLayout />
            </div>
          </>
        )}
      </AuthGuard>
  );
};

export default LandingIndex;
