import React, { useState } from 'react';
interface Props {
  text?: string;
  color?: string;
  classes?: string;
}
const Badge = ({ text, color, classes }: Props) => {
  return <span className={`${color ? color : 'bg-gray-100 text-gray-800'} text-xs font-medium px-2.5 py-1.5 rounded ${classes}`}>{text}</span>;
};

export default Badge;
