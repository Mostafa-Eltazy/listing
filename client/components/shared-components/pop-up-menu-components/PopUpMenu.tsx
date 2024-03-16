import React, { useEffect, useRef } from 'react';

interface Props {
  holderComponent: React.ReactNode;
  children: React.ReactNode;
  positioningClases? : string;
}
const PopUpMenu = ({ holderComponent, children, positioningClases='top-11' }: Props) => {
  const [trigger, setTrigger] = React.useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        const detailsElement = detailsRef.current;
        if (detailsElement && detailsElement.contains(event.target as Node)) {
          return;
        }
        setTrigger(false);
      }
    };

    if (trigger) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      if (!trigger && detailsRef.current) {
        detailsRef.current.removeAttribute('open');
      }
    };
  }, [trigger]);

  return (
    <details ref={detailsRef} className="relative">
      <summary className="list-none hover:cursor-pointer" onClick={() => setTrigger(prevValue => !prevValue)}>
        {holderComponent}
      </summary>
      {trigger ? (
        <div ref={ref} className={`absolute border border-sky-100 shadow-lg ${positioningClases}`}>
          {children}
        </div>
      ) : null}
    </details>
  );
};

export default PopUpMenu;
