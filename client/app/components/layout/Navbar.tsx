'use client';

import Link from 'next/link';
import styles from './Navbar.module.css';
import Logo from '@/app/components/layout/Logo';

const Navbar: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <Link href="/">
                <Logo
                    src="/assets/logo.png"
                    width={400}
                    height={74}
                    alt="Logo"
                />
            </Link>
        </nav>
    );
};

export default Navbar;
