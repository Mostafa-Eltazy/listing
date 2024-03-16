import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom, userLoadingAtom } from '../../lib/atoms/user.atom';
import GenericHeader from './GenericHeader';
import UserHeader from './UserHeader';
import { headerRoutes } from '../../util/constants';

interface Props {
  page?: string
}
const Header = ({page}:Props) => {
  const [isSticky, setIsSticky] = useState(false);
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY - 3.5;
      if (offset > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header grid ${user ? 'grid-cols-8' : 'grid-cols-2 md:grid-cols-3'} bg-slate-50 pt-2 top-0 fixed w-full z-10 ${isSticky ? 'shadow-lg' : ''} `}>
      {user ? (
        <UserHeader
          routes={headerRoutes}
          active={page ?? ''}
        />
      ) : (
        <GenericHeader />
      )}
    </header>
  );
};

export default Header;
