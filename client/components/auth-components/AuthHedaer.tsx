import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Logo from '../header-components/Logo';

interface Props {
  children?: React.ReactNode;
}

const inactiveLinkStyle =
  'mx-2 px-2 md:mx-4 py-2 md:px-4  bg-transparent border-b-0 rounded-t hover:bg-blue-500 text-blue-700 hover:text-white  border border-blue-500 hover:border-transparent';
const activeLinkStyle = 'mx-2 px-2 mx-4 py-2 md:px-4  border-b-0 rounded-t bg-blue-500 text-white border border-blue-500 hover:border-transparent ';

const AuthHedaer = ({ children }: Props) => {
  const router = useRouter();
  const isActive = router.pathname.split('/')[2];
  return (
    <div className="md:p-8 m-8">
      <div className="bg-slate-50 border pt-5 rounded">
        <div className="py-3 mb-4">
          <Link href='/'>
          <Logo />
          
          </Link>
        </div>

        <div className="flex justify-center items-center ">
          <Link href="/auth/signup" className={isActive === 'signup' ? activeLinkStyle : inactiveLinkStyle}>
            Sign up
          </Link>
          <Link href="/auth/login" className={isActive === 'login' ? activeLinkStyle : inactiveLinkStyle}>
            Log in
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthHedaer;
