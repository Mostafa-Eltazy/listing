import { useAtom } from 'jotai';
import React from 'react';
import LoginLayout from '../../../components/auth-components/LoginLayout';
import AuthGuard from '../../../components/shared-components/AuthGuard';
import GenericLoading from '../../../components/shared-components/GenericLoading';
import { userAtom, userLoadingAtom } from '../../../lib/atoms/user.atom';

const LoginIndex = () => {
  
  const [user, setUser] = useAtom(userAtom);
  const [userLoading, setUserLoading] = useAtom(userLoadingAtom);

  return (
    <>
      <AuthGuard loggedInRedirectUrl="/dashboard">
        {user || userLoading ? (
          <GenericLoading />
        ) : (
          <>
            <LoginLayout />
          </>
        )}
      </AuthGuard>
    </>
  );
};

export default LoginIndex;
