import React, { useState } from 'react';
interface Props {
  text: string;
  condition: boolean;
}
const BadgeChecker = ({ text, condition }: Props) => {
  return (
    <span className={`bg-gray-100 text-gray-800 flex flex-wrap text-xs font-medium mr-2 px-1.5 py-1.5 rounded-full mb-1.5 ${condition ? 'bg-green-100 text-green-800' : ''}`}>
      {text}
    </span>
  );
};

export default BadgeChecker;
