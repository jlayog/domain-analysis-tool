'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './UnitListPanel.module.css';
import { UnitListProps } from '@/app/types';

const UnitListPanel: React.FC = () => {
    const [units, setUnits] = useState<UnitListProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    const fetchUnits = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3001/api/units');
            if (!response.ok) {
                throw new Error('Failed to fetch units');
            }
            const data = await response.json();
            setUnits(data);
        } catch (err) {
            console.error('Error fetching units:', err);
        } finally {
            setLoading(false);
        }
    };

    // Delete a unit by its ID
    const deleteUnit = async (unit_id: number, unit_name: string) => {
        const confirmation = confirm(`Are you sure you want to delete ${unit_name}?`);
        if (!confirmation) return;
    
        try {
            const response = await fetch(`http://localhost:3001/api/units/delete/${unit_id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete unit');
            }
            setUnits(prevUnits => prevUnits.filter(unit => unit.id !== unit_id));
            alert(`${unit_name} has been successfully deleted.`);
        } catch (err) {
            console.error('Error deleting unit:', err);
            alert('An error occurred. Please try again.');
        }
    };

    // Navigate to the unit page
    const handleUnitClick = (slug: string) => {
        router.push(`/${slug}`);
    };

    useEffect(() => {
        fetchUnits();
    }, []);

    return (
        <div className={styles.unitListPanel}>
            <div className={styles.unitListHeader}>
                <h2>Units List</h2>
                <button onClick={fetchUnits} className={styles.refreshButton}>
                    Refresh
                </button>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className={styles.unitList}>
                    {units.length > 0 ? (
                        units.map((unit: UnitListProps) => (
                            <li key={unit.id} className={styles.unitListItem}>
                                <span onClick={() => handleUnitClick(unit.slug)} className={styles.unitName}>
                                    <h4>{unit.name}</h4>
                                </span>
                                <button
                                    onClick={() => deleteUnit(unit.id, unit.name)}
                                    className={styles.deleteButton}
                                >
                                    Delete
                                </button>
                            </li>
                        ))
                    ) : (
                        <p>No units found.</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default UnitListPanel;
