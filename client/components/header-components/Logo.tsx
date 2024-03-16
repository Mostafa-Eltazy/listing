import React from 'react';
import { MdOutlineHomeWork } from "react-icons/md";

interface Props {
  logoText?: React.ReactNode;
  logoSize?: string
}
const Logo = ({ logoText, logoSize = '30px' }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <p className="bg-transparent text-blue-500">
        <MdOutlineHomeWork style={{ fontSize: logoSize }} />
      </p>
      {logoText ? logoText : null}
    </div>
  );
};

export default Logo;
