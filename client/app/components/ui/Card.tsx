import React from 'react';
import styles from './Card.module.css';

type CardProps = {
  department: string;
  pageCount: number;
  link: string; // This is the origin_url
  completed?: boolean; 
  slug: string; // Used for onClick navigation
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ department, link, pageCount, onClick }) => {
  return (
    <div className={styles.cardContainer} onClick={onClick}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>{department}</h2>
          {link && (
            // This link will now prevent the card click from happening if the user clicks on it
            <a
              href={link}
              className={styles.cardLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} // Prevent the entire card's onClick from firing
            >
              Visit Source
            </a>
          )}
        </div>
        <div className={styles.cardContent}>
          <img
            src="https://picsum.photos/1920/1080/"
            alt="Card Image"
            className={styles.cardImage}
          />
        </div>
        <div className={styles.cardFooter}>
          <h3>
            Page Count: <span>{pageCount}</span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Card;
