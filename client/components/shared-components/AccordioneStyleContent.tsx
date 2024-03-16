interface Props {
  children?: React.ReactNode | React.ReactNode[];
  trigger: boolean;
  classes?: string;
  triggerdClasses?: string;
  untriggerdClasses?:string;
}
const AccordioneStyleContent = ({ children, trigger, classes, triggerdClasses, untriggerdClasses }: Props) => {
  return (
    <div className={`Accordion__Content ${trigger ? `Accordion__Content--open ${triggerdClasses}`:`${untriggerdClasses}`} ${classes ? classes : ''}`}>
      {children}
    </div>
  );
};

export default AccordioneStyleContent;
