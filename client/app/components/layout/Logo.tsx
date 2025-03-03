import React from 'react';
import Image from 'next/image';
import styles from './Logo.module.css';

interface LogoProps {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  src, 
  width = 200, 
  height = 100, 
  alt = 'Logo' 
}) => {
  return (
    <div className={styles.logo}>
      <Image 
        src={src}
        width={width}
        height={height}
        alt={alt}
      />
    </div>
  );
};

export default Logo;
