import { IoIosAddCircleOutline } from 'react-icons/io';
import LoadingSpinner from './LoadingSpinner';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  profilePicture: any;
  isUploading: boolean;
  uploadFiletoStorage: () => void;
  handleFileChange: (e: any) => void;
}
const PPUploader = ({profilePicture, isUploading, uploadFiletoStorage, handleFileChange }: Props) => {
  return (
    <div className="flex flex-col items-left justify-center p-2 lg:p-10 pt-0">
      <p className='text-sm text-center mb-2'>Upload Profile Picture</p>
      <input
        id="formFile"
        type="file"
        accept="image/*"
        onChange={e => handleFileChange(e)}
        className="bg-slate-50 rounded border border-gray-100 text-gray-900 text-sm  focus:outline-none  focus:border-gray-300 w-full p-2"
        disabled={isUploading}
      />
      <div className="flex my-9">
        <button
          className="disabled:border-gray-300 disabled:text-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded px-8 py-1 border border-blue-500 bg-transparent text-blue-600 hover:bg-blue-500 hover:text-white hover:border-blue-500"
          onClick={() => uploadFiletoStorage()}
          disabled={!profilePicture || isUploading}
        >
          {isUploading ? <LoadingSpinner /> : 'upload'}
        </button>
      </div>
    </div>
  );
};

export default PPUploader;
