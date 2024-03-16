import { useAtom } from 'jotai';
import { NextPage } from 'next';
import Header from '../../components/header-components/Header';
import AuthGuard from '../../components/shared-components/AuthGuard';
import GenericLoading from '../../components/shared-components/GenericLoading';
import { userAtom, userLoadingAtom } from '../../lib/atoms/user.atom';
import { useRouter } from 'next/router';
import ExploreLayout from '../../components/explore-page-components/ExploreLayout';

const ExploreIndex: NextPage = () => {
  const [user, setUser] = useAtom(userAtom);
  const [userLoading, setUserLoading] = useAtom(userLoadingAtom);

  return (
    <AuthGuard loggedOutRedirectUrl="/">
      {!user || userLoading ? (
        <GenericLoading />
      ) : (
        <>
          <Header page="explore" />
          <ExploreLayout />
        </>
      )}
    </AuthGuard>
  );
};

export default ExploreIndex;
