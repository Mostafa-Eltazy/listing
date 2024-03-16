import React, { useRef, useEffect } from 'react';
import ParalledCard from '../shared-components/ParalledCard';
import { BsBoxSeam } from 'react-icons/bs';
import { RiAuctionLine } from 'react-icons/ri';
import { TbCurrencyDollar } from 'react-icons/tb';

const ProcessFlow = () => {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            entry.target.classList.add('slide-in-blurred-bottom');
          } else {
            entry.target.classList.add('hide');
          }
        });
      },
      { threshold: 0.85 },
    );

    document.querySelectorAll('.process-icon').forEach(icon => {
      observer.current?.observe(icon);
    });

    return () => {
      observer.current?.disconnect();
    };
  }, []);

  return (
    <div className="py-8">
      <h1 className="text-center font-serif text-5xl text-slate-600 mt-8">How it works ?</h1>
      <ParalledCard
        styles={{ minHeight: '40vh' }}
        classes="md:px-10 my-4"
        leftComp={
          <div>
            <p className="bg-transparent text-blue-500 font-semibold py-2 px-4 lg:px-8  process-icon">
              <BsBoxSeam style={{ fontSize: '150px' }} />
            </p>
          </div>
        }
        rightComp={
          <div>
            <h3 className="text-3xl">Create an account </h3>
            <p>
              simply go through our registration process and create an account,
              <br /> and you are ready to go
            </p>
          </div>
        }
      />

      <ParalledCard
        styles={{ minHeight: '40vh' }}
        classes="md:px-10 my-4 "
        rightComp={
          <div>
            <p className="bg-transparent text-blue-500 font-semibold py-2 px-4 lg:px-8  process-icon">
              <RiAuctionLine style={{ fontSize: '150px' }} />
            </p>
          </div>
        }
        leftComp={
          <div>
            <h3 className="text-3xl">Create a Listing</h3>
            <p>
              create a brand new lsiting of a property that you want to be placed on the market <br /> and leave it out for everyone to see
            </p>
          </div>
        }
      />

      <ParalledCard
        styles={{ minHeight: '40vh' }}
        classes="md:px-10 my-4 "
        leftComp={
          <div>
            <p className="bg-transparent text-blue-500 font-semibold py-2 px-4 lg:px-8  process-icon">
              <TbCurrencyDollar style={{ fontSize: '150px' }} />
            </p>
          </div>
        }
        rightComp={
          <div>
            <h3 className="text-3xl">Explore listings</h3>
            <p>
              Check out our explore page and find the perfect listing that you are looking for <br /> enjoyr our wide selection of choices
            </p>
          </div>
        }
      />
    </div>
  );
};

export default ProcessFlow;
