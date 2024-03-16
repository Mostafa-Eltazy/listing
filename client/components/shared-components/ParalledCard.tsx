import React from 'react';
interface Props {
  classes?: string;
  styles?: {}
  leftComp?: React.ReactNode;
  rightComp?: React.ReactNode;
}
const ParalledCard = ({ classes, styles, leftComp, rightComp }: Props) => {
  return (
    <div className={`${classes ? classes : ''} flex justify-center items-center`} style={{...styles}}>
      {leftComp ? <div className="p-6 w-1/2 flex flex-col justify-center items-center ">{leftComp}</div> : null}
      {rightComp ? <div className="p-6  w-1/2 flex flex-col justify-center items-center">{rightComp}</div> : null}
    </div>
  );
};

export default ParalledCard;
