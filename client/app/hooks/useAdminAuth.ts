import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  unit_name: string;
  origin_url: string;
  property_id: string;
  url_slug: string;
  start_date: string;
  end_date: string;
  metric: string;
}

const useAdminAuth = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if the user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/api/google/auth-check', {
          credentials: 'include',
        });
        const data = await response.json();
        if (data.authenticated) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          router.push('/login');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setAuthenticated(false);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);


  // Form submission function
  const handleSubmit = async (formData: FormData) => {
    try {
      const response = await fetch('http://localhost:3001/api/google/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch analytics data');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return {
    authenticated,
    loading,
    handleSubmit,
  };
};

export default useAdminAuth;
