import { useAtom } from 'jotai';
import React from 'react';
import { userAtom, userLoadingAtom } from '../../lib/atoms/user.atom';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { IoSettingsOutline } from "react-icons/io5";

interface Props {
  currentView: string;
  updateView: (view: string) => void;
}
const buttonIdleStyle = 'bg-slate-50 hover:bg-slate-100 text-slate-900 font-semibold py-4 px-4 flex items-center justify-start';
const buttonActiveStyle = 'bg-slate-50 bg-slate-100 text-slate-900 font-semibold py-4 px-4 flex items-center justify-start';

const DashboardMenu = ({ currentView, updateView }: Props) => {
  const [user, setUser] = useAtom(userAtom);
  const [userLoading, setUserLoading] = useAtom(userLoadingAtom);

  return (
    <div className="col-start-1 col-end-3 bg-slate-50 fixed w-3/12 h-full top-16">
      <div className="mt-5 flex flex-col">
        <p className="text-center font-semibold mb-4">
          {user?.lastname}, {user?.firstname}
        </p>
        <button className={`${currentView === 'create_listing' ? buttonActiveStyle : buttonIdleStyle}`} onClick={() => updateView('create_listing')}>
          <IoMdAddCircleOutline size={25} color={'green'} className="mr-2"/> Add a Listing
        </button>
        <button className={`${currentView === 'settings' ? buttonActiveStyle : buttonIdleStyle}`} onClick={() => updateView('settings')}>
          <IoSettingsOutline size={25} color={'green'} className="mr-2"/>Settings
        </button>
      </div>
    </div>
  );
};

export default DashboardMenu;
