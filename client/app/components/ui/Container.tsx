import React, { ReactNode } from 'react';
import styles from './Container.module.css';

interface ContainerProps {
  children?: ReactNode;
  fluid?: boolean;
  className?: string;
  center?: boolean;
}
/*  
  Lets you add 'fluid' and 'center' property to Container component which will make 
  the container full-width or center content within e.g. <Container fluid>...</Container>  
*/
const Container: React.FC<ContainerProps> = ({ 
  children, 
  fluid = false, 
  className = '' ,
  center = false,
}) => {
  const containerClass = fluid ? styles.containerFluid : styles.container;

  const centerClass = center ? styles.centerContent : '';

  const combinedClasses = `${containerClass} ${centerClass} ${className}`.trim();

  return (
    <div className={combinedClasses}>
      {children}
    </div>
  );
};

export default Container;