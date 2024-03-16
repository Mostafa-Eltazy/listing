import React, { useEffect, useState } from 'react';
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';

interface Props {
  children: React.ReactNode[];
  errorsObj?: {};
  errorRefrer?: {};
}

function checkObject(index: number, refObj: Record<number, string[]> | undefined, errorObj: Record<string, any> | undefined): boolean {
  if (refObj && errorObj) {
    const refValues = refObj[index];
    for (const value of refValues) {
      if (errorObj.hasOwnProperty(value)) {
        return true;
      }
    }
    return false;
  }
  return false;
}

const MultiStepForm = ({ children, errorsObj, errorRefrer }: Props) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [currentChild, setCurrentChild] = useState<React.ReactNode>(children[currentStep]);
  const [playRightAnimation, setPlayRightAnimation] = useState<boolean>(false);
  const [playLeftAnimation, setPlayLeftAnimation] = useState<boolean>(false);


  const steps = children.length;
  const idleStyle = 'm-1 md:m-2 w-2.5 h-2.5 border-2 border-slate-300  rounded-full flex items-center justify-center';
  const errorIdleStyle = 'm-1 md:m-2 w-2.5 h-2.5 border-2 border-red-300  rounded-full flex items-center justify-center';
  const currentStyle = 'm-1 md:m-2 w-2.5 h-2.5 border-1 bg-blue-500 border-slate-500 rounded-full flex items-center justify-center';
  const errorCurrentStyle = 'm-1 md:m-2 w-2.5 h-2.5 border-1 bg-red-500 border-slate-500 rounded-full flex items-center justify-center';
  const arrowsStyle = 'text-blue-500 hover:cursor-pointer ';

  const moveForward = () => {
    if (currentStep === steps - 1) {
      setCurrentStep(0);
    } else {
      setCurrentStep(prevValue => prevValue + 1);
    }
    setPlayRightAnimation(true);
  };
  const moveBackward = () => {
    if (currentStep === 0) {
      setCurrentStep(steps - 1);
    } else {
      setCurrentStep(prevValue => prevValue - 1);
    }
    setPlayLeftAnimation(true);
  };

  useEffect(() => {
    setCurrentChild(children[currentStep]);
  }, [children, currentStep]);

  const handleRightAnimationEnd = () => {
    const currentChildElement = document.querySelector('.current-child');
    currentChildElement && currentChildElement.classList.remove('slide-in-right');
    setPlayRightAnimation(false);
  };
  const handleLeftAnimationEnd = () => {
    const currentChildElement = document.querySelector('.current-child');
    currentChildElement && currentChildElement.classList.remove('slide-in-left');
    setPlayLeftAnimation(false);
  };

  useEffect(() => {
    const currentChildElement = document.querySelector('.current-child');
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
  }, [currentChild, playLeftAnimation, playRightAnimation]);

  return (
    <>
      {React.cloneElement(currentChild as React.ReactElement<any>, { className: 'current-child' })}
      <div className="flex justify-around items-center my-9 shadow-lg border rounded-full py-2 bg-slate-50">
        <FiArrowLeftCircle className={arrowsStyle} onClick={moveBackward} />
        {steps > 0 ? (
          <>
            <div className="flex flex-wrap">
              {children.map((c, index) => {
                return (
                  <li
                    key={index}
                    className={
                      index === currentStep
                        ? checkObject(index, errorRefrer, errorsObj)
                          ? errorCurrentStyle
                          : currentStyle
                        : checkObject(index, errorRefrer, errorsObj)
                        ? errorIdleStyle
                        : idleStyle
                    }
                  />
                );
              })}
            </div>
          </>
        ) : null}
        <FiArrowRightCircle className={arrowsStyle} onClick={moveForward} />
      </div>
    </>
  );
};

export default MultiStepForm;
