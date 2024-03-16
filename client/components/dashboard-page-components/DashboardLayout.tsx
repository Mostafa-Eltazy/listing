import { useAtom } from 'jotai';
import React from 'react';
import { userAtom } from '../../lib/atoms/user.atom';
import { dashboardViews } from '../../util/constants';
import CreateListingView from './CreateListingView';
import DashboardMenu from './DashboardMenu';
import SettingsView from './SettingsView';

const DashboardLayout = () => {
  const [user, setUser] = useAtom(userAtom);
  const [currentView, setCurrentView] = React.useState(dashboardViews[0].value);

  return (
    <div className="grid grid-cols-8">
      <DashboardMenu currentView={currentView} updateView={setCurrentView} />
      <div className="col-start-3 col-end-7 mt-5">
        {currentView === 'create_listing' ? <CreateListingView /> : null}
        {currentView === 'settings' ? <SettingsView /> : null}
      </div>
    </div>
  );
};

export default DashboardLayout;
