import Link from 'next/link';
import React from 'react';
import Logo from './Logo';

const GenericHeader = () => {
  return (
    <>
      <div className="col-span-1 flex justify-center items-center">
        <Link href="/">
          <Logo
            logoText={
              <span className="font-serif text-slate-600">
                <i>L</i>isting
              </span>
            }
          />
        </Link>
      </div>
      <div className="col-span-1 hidden md:block"></div>
      <div className="col-span-1 flex justify-center items-center">
        <Link
          href="auth/signup"
          className="mx-1 md:mx-4 py-2 px-1 md:px-4 text-sm sm:text-base bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white  border border-blue-500 hover:border-transparent rounded"
        >
          Sign up
        </Link>
        <Link
          href="auth/login"
          className="mx-1 md:mx-4 py-2 px-1 md:px-4 text-sm sm:text-base bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white border border-blue-500 hover:border-transparent rounded"
        >
          Log in
        </Link>
      </div>
    </>
  );
};

export default GenericHeader;
