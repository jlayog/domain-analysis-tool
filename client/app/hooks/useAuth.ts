import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const router = useRouter();

  // Function to handle OAuth login flow
  const handleLogin = async () => {
    try {
      // Step 1: Get the Google OAuth URL from the backend
      const response = await fetch('http://localhost:3001/api/google/auth', {
        credentials: 'include', // Include credentials to ensure cookies are set
      });
      if (!response.ok) {
        throw new Error(`Failed to initiate OAuth flow: ${response.statusText}`);
      }

      const data = await response.json();
      const authUrl = data.authUrl;

      if (authUrl) {
        // Step 2: Open the Google OAuth URL in a new popup window
        const popup = window.open(authUrl, '_blank', 'width=500,height=600');

        if (!popup) {
          throw new Error("Popup blocked, please allow popups for this site.");
        }

        // Monitor when the popup is closed
        // const popupInterval = setInterval(() => {
        //   if (popup.closed) {
        //     clearInterval(popupInterval);
        //     console.log("OAuth popup window closed.");
        //   }
        // }, 1000);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Effect to handle authentication success messages
  useEffect(() => {
    const handleAuthSuccess = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) {
        // Ignore messages from unexpected origins
        return;
      }

      if (event.data && event.data.type === 'AUTH_SUCCESS') {
        console.log("Authentication successful, redirecting to admin...");
        router.push('/admin');
      }
    };

    // Add event listener to handle messages from the popup
    window.addEventListener('message', handleAuthSuccess);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('message', handleAuthSuccess);
    };
  }, [router]);

  return {
    handleLogin,
  };
};

export default useAuth;
