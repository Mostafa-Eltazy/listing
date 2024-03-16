import Image from 'next/image';
import React from 'react';
import Link from 'next/link'


const Headline = ({}) => {
  return (
    <div className="md:flex justify-between pt-8 pb-5 px-6 bg-blue-100 ">
      <div className="md:w-1/2 flex flex-col justify-center items-end">
       <div>
       <h1 className="text-7xl font-serif">Check out our wide rangs of listing  </h1>
        <p className="text-xl pt-2"> Join the action on our diverse platform for free <br/>and all from the comfort of your home</p>
            <Link href='/auth/signup'>
          <button className="w-full my-3 md:w-1/3 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 lg:px-8 border border-blue-500 hover:border-transparent rounded">
            Sign up
          </button>
            </Link>
       </div>
      </div>
      <div className="md:w-1/2  md:pl-10 md:ml-10">
        <Image src='/static/headline-user.jpeg'alt='a' height={1000} width={650} className='rounded opacity-65'/>
      </div>
    </div>
  );
};

export default Headline;
