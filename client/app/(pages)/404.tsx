// app/404.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Container from '@/app/components/ui/Container';

const NotFoundPage: React.FC = () => {
  return (
    <Container>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.message}>
        Oops! The page you are looking for does not exist.
      </p>
      <Link href="/">
        <a style={styles.homeLink}>Go back to the Homepage</a>
      </Link>
    </Container>
  );
};

const styles = {
  heading: {
    fontSize: '3rem',
    color: '#333',
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1.5rem',
    color: '#666',
    marginBottom: '2rem',
  },
  homeLink: {
    color: '#0070f3',
    textDecoration: 'none',
    fontWeight: 'bold', 
    marginTop: '1rem',
    fontSize: '1.25rem',
  },
};

export default NotFoundPage;
