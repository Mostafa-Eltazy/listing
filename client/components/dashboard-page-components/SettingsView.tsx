import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { fetchUser, uploadProfilePicture } from '../../lib/api/user.api';
import { userAtom } from '../../lib/atoms/user.atom';
import PPUploader from '../shared-components/PPUploader';

const SettingsView = () => {
  const [user, setUser] = useAtom(userAtom);
  const [displayUploader, setDisplayUploader] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  

  const uploadFiletoStorage = async () => {
    try {
      setIsUploading(true);
      await uploadProfilePicture(profilePicture);
      setProfilePicture(null);
      const data = await fetchUser();
      setUser(data);
      toast('profile picture update successful', { type: 'success' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: any) => {
    const image = { ...e.target.files };
    setProfilePicture(image[0]);
  };


  return (
    <div>
      <h3 className="text-center">Settings</h3>
      <PPUploader
        profilePicture={profilePicture}
        isUploading={isUploading}
        uploadFiletoStorage={uploadFiletoStorage}
        handleFileChange={handleFileChange}
      />
    </div>
  );
};

export default SettingsView;
