import React from 'react';
import Link from 'next/link';

import styles from './Footer.module.css';


const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
        <nav>
          <ul>
            <li>
              <Link href="/">
                Back Home
              </Link>
              <span className={styles.divider}>|</span>
            </li>
            <li>
              <Link href="/admin">
                Admin
              </Link>
              <span className={styles.divider}>|</span>
            </li>
            <li>
              <Link href="mailto:sample@email.com">
                Contact Us
              </Link>
              <span className={styles.divider}>|</span>
            </li>
            <li>
              <Link href="https://jerel.dev" target="_blank">
                Visit my website
              </Link>
            </li>
          </ul>
        </nav>
    </footer>
  );
};

export default Footer;
