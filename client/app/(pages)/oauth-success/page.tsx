"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const OAuthSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    // Notify the opener window that authentication succeeded
    if (window.opener) {
      window.opener.postMessage({ type: 'AUTH_SUCCESS' }, '*');
      window.close();
    } else {
      console.error('No opener window found');
    }
  }, [router]);

  return (
    <div>
      <h1>Authentication Successful</h1>
      <p>You can close this window now.</p>
    </div>
  );
};

export default OAuthSuccess;
