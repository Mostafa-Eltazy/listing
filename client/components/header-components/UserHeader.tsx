import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { userAtom } from '../../lib/atoms/user.atom';
import PopUpMenu from '../shared-components/pop-up-menu-components/PopUpMenu';
import Logo from './Logo';
import ProfilePopUpMenu from './ProfilePopUpMenu';

interface Props {
  routes: { [key: string]: string }[];
  active: string;
}
const activeRouteStyle = 'text-slate-800 border-b-sky-600 border-b-2 ';
const idleRouteStyle = 'text-slate-600';
const UserHeader = ({ routes, active }: Props) => {
  const [user, setUser] = useAtom(userAtom);
  return (
    <>
      <div className="col-span-2 flex justify-center items-center">
        <Link href="/">
          <Logo logoSize="35px" />
        </Link>
      </div>
      <div className="col-span-4  flex justify-between items-center">
        {routes.map(route => (
          <li className={`list-none font-serif py-4 px-2 ${active === route.slug ? activeRouteStyle : idleRouteStyle}`} key={route.slug}>
            <Link className="hover:text-slate-400 " href={`/${route.slug}`}>
              <span>{route.name}</span>
            </Link>
          </li>
        ))}
      </div>
      <div className="col-span-2 flex justify-center items-center">
        <PopUpMenu
          holderComponent={
            <Image
              src={`${user?.profilePicture || '/static/placeholder.webp'}`}
              className="rounded-full header-profile-picture"
              alt={`${user?.username ? `${user?.username} profile picture` : 'profile picture'}`}
              width={100}
              height={100}
            />
            
          }
          positioningClases={'top-11'}
        >
          <ProfilePopUpMenu />
        </PopUpMenu>
      </div>
    </>
  );
};

export default UserHeader;
