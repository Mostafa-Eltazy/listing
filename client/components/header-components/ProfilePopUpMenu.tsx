import { useAtom } from 'jotai';
import router from 'next/router';
import { CiLogout } from 'react-icons/ci';
import { userAtom } from '../../lib/atoms/user.atom';
import { clearAuthToken, getAuthToken } from '../../util/token-storage';

const menuElemStyle = 'text-left text-sm font-serif py-2 px-3 border-b hover:text-black hover:bg-sky-100 block';

const ProfilePopUpMenu = () => {
  const [user, setUser] = useAtom(userAtom);
  
  const handleLogout = () => {
    clearAuthToken();
    if (!getAuthToken()) {
      router.reload();
    }
  };


  return (
    <div className="flex flex-col pt-1 bg-slate-100" style={{ width: '110px' }}>
      <p className="whitespace-pre-line break-words px-3 text-sm border-b py-2">
        welcome, <span className="block">{user?.username}</span>
      </p>
      {/* <PPUploader
        displayUploader={displayUploader}
        setDisplayUploader={setDisplayUploader}
        profilePicture={profilePicture}
        isUploading={isUploading}
        uploadFiletoStorage={uploadFiletoStorage}
        handleFileChange={handleFileChange}
      /> */}
      <button onClick={handleLogout}>
        <div className={`${menuElemStyle} flex items-center `}>
          <CiLogout />
          <span className="ml-1">Log out</span>
        </div>
      </button>
    </div>
  );
};

export default ProfilePopUpMenu;
function useUserStats(arg0: { userId: number | undefined; }): { data: any; isLoading: any; } {
  throw new Error('Function not implemented.');
}

