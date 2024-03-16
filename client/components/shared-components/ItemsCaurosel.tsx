import React, { useEffect, useState } from 'react';
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';

const arrowsStyle = 'text-blue-500 hover:cursor-pointer';

interface Props {
  children?: React.ReactNode | ((moveForward: () => void, moveBackward: () => void) => React.ReactNode);
}

const ItemsCarousel = ({ children }: Props) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [playRightAnimation, setPlayRightAnimation] = useState<boolean>(false);
  const [playLeftAnimation, setPlayLeftAnimation] = useState<boolean>(false);

  const steps = Array.isArray(children) ? children.length : 1;

  const moveForward = () => {
    if (Array.isArray(children) && currentStep === children.length - 1) {
      setCurrentStep(0);
    } else if (Array.isArray(children)) {
      setCurrentStep((prevValue) => prevValue + 1);
    }
    setPlayRightAnimation(true);
  };

  const moveBackward = () => {
    if (Array.isArray(children) && currentStep === 0) {
      setCurrentStep(children.length - 1);
    } else if (Array.isArray(children)) {
      setCurrentStep((prevValue) => prevValue - 1);
    }
    setPlayLeftAnimation(true);
  };

  const handleRightAnimationEnd = () => {
    const currentChildElement = document.querySelector('.current-child') as HTMLElement;
    currentChildElement && currentChildElement.classList.remove('slide-in-right');
    setPlayRightAnimation(false);
  };

  const handleLeftAnimationEnd = () => {
    const currentChildElement = document.querySelector('.current-child') as HTMLElement;
    currentChildElement && currentChildElement.classList.remove('slide-in-left');
    setPlayLeftAnimation(false);
  };

  useEffect(() => {
    const currentChildElement = document.querySelector('.current-child') as HTMLElement;
    if (playRightAnimation) {
      currentChildElement && currentChildElement.classList.add('slide-in-right');
      currentChildElement && currentChildElement.addEventListener('animationend', handleRightAnimationEnd);
    }
    if (playLeftAnimation) {
      currentChildElement && currentChildElement.classList.add('slide-in-left');
      currentChildElement && currentChildElement.addEventListener('animationend', handleLeftAnimationEnd);
    }

    return () => {
      currentChildElement && currentChildElement.removeEventListener('animationend', handleRightAnimationEnd);
      currentChildElement && currentChildElement.removeEventListener('animationend', handleLeftAnimationEnd);
    };
  }, [playLeftAnimation, playRightAnimation]);

  return (
    <>
      {typeof children === 'function'
        ? children(moveForward, moveBackward)
        : Array.isArray(children) && children[currentStep] && (
            <>
              <div className="mx-4 bg-white mt-4 pb-4 rounded">
                <div className=" flex justify-center md:justify-end "><span className="my-3 mx-2 p-2 rounded text-sm bg-slate-50">{steps > 1 ? `Item ${currentStep + 1} of ${steps}` : 'Single item'}</span> </div>
                {React.cloneElement(children[currentStep] as React.ReactElement<any>, {
                  className: 'current-child',
                })}
              </div>
              <div className='flex justify-around items-center mb-3 shadow-lg border rounded py-2 mx-4 bg-slate-50'>
                <button>
                  <FiArrowLeftCircle className={arrowsStyle} onClick={moveBackward} />
                </button>
                <button>
                  <FiArrowRightCircle className={arrowsStyle} onClick={moveForward} />
                </button>
              </div>
            </>
          )}
    </>
  );
};

export default ItemsCarousel;
