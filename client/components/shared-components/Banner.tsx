import Link from 'next/link';
import React from 'react';

interface Props {
  main?: string;
  subText?: React.ReactNode;
}
const Banner = ({ main, subText }: Props) => {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-center font-serif text-3xl text-slate-600 mt-8">{main}</h1>
      {subText}
    </div>
  );
};

export default Banner;
