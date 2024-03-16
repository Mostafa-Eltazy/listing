import React from 'react';
import ParalledCard from '../shared-components/ParalledCard';

const UsSection = () => {
  return (
    <div className="py-8">
      <ParalledCard
        leftComp={
          <>
            <h1 className="text-center font-serif text-3xl text-slate-600 mt-8 mb-6">Our Story</h1>
            <p className="py- md:mx-8 font-serif text-md text-center">
              Our Story Listing was born from a simple idea: to revolutionize the way people buy and sell properties. Our founders, driven by their passion for
              real estate and technology, set out to create a platform that would make property transactions easier and more accessible for everyone. With
              dedication and hard work, our team developed an intuitive and user-friendly platform that caters to the needs of both sellers and buyers. From
              humble beginnings, we have grown into a trusted name in the industry, serving millions of users worldwide. Today,Listing continues to evolve,
              always striving to provide the best possible experience for our users. Our journey is ongoing, and we are excited to continue rewriting the future
              of real estate, one listing at a time.
            </p>
          </>
        }
      />

      <ParalledCard
        rightComp={
          <>
            <h1 className="text-center font-serif text-3xl text-slate-600 mt-8 mb-6">Our Mission</h1>
            <p className="py- md:mx-8 font-serif text-md text-center">
              At Listing, we're committed to fostering a vibrant community of sellers and buyers, where everyone can achieve their property goals with
              confidence and ease. Whether you're selling or buying, we're here to support you every step of the way, making your property journey enjoyable and
              successful. Join us today and discover a world of endless possibilities in the real estate market!
            </p>
          </>
        }
      />
    </div>
  );
};

export default UsSection;
