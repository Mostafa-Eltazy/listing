import { useAtom } from 'jotai'
import React from 'react'
import SignupLayout from '../../../components/auth-components/SignupLayout'
import AuthGuard from '../../../components/shared-components/AuthGuard'
import GenericLoading from '../../../components/shared-components/GenericLoading'
import { userAtom, userLoadingAtom } from '../../../lib/atoms/user.atom'

const SignupIndex=() =>{

  const [user, setUser] = useAtom(userAtom);
  const [userLoading, setUserLoading] = useAtom(userLoadingAtom);

  return (
    <AuthGuard loggedInRedirectUrl="/dashboard">
    {user || userLoading ? (
      <GenericLoading />
      ) : (
        <>
        <SignupLayout />
      </>
    )}
  </AuthGuard>
  )
}

export default SignupIndex