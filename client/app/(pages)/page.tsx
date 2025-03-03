'use client';

import React, { useEffect, useState } from 'react';
import Card from '@/app/components/ui/Card';
import Grid from '@/app/components/layout/Grid';
import { useRouter } from 'next/navigation';
import { HomePageUnit } from '@/app/types';

const HomePage: React.FC = () => {
  const [units, setUnits] = useState<HomePageUnit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:3001/api/units');
        if (!res.ok) {
          throw new Error('Failed to fetch units');
        }
        const data = await res.json();
        setUnits(data);
      } catch (err) {
        console.error('Error fetching units:', err);
        setError('Unable to fetch units. Please try again later.');
      }
      finally {
        setLoading(false);
      }
    };

    fetchUnits();
  }, []);

  const handleCardClick = (slug: string) => {
    if (slug) {
      router.push(`/${slug}`);
    } else {
      console.error('Slug is null or undefined. Cannot navigate.');
    }
  };

  if (loading) {
    return <p>Loading units...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Grid>
      {units.map((data) => (
        <Card
          key={data.id}
          department={data.name}
          pageCount={data.page_count ?? 0}
          link={data.origin_url ?? '#'}
          completed={data.completed}
          slug={data.slug}
          onClick={() => handleCardClick(data.slug)}
        />
      ))}
    </Grid>
  );
};

export default HomePage;
