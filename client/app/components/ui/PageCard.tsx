import React, { useEffect, useState } from 'react';
import styles from './PageCard.module.css';
import { PageCardProps } from '@/app/types';

const PageCard: React.FC<PageCardProps> = ({
  id,
  pageTitle,
  pageViews,
  pageLink,
  pageKeepOrDelete,
  pagePriority,
  pageAudience,
  pageNotes,
  onUpdate,
  onInteract,
}) => {
  const [keepOrDelete, setKeepOrDelete] = useState<boolean | null>(
    pageKeepOrDelete === 1 ? true : pageKeepOrDelete === 0 ? false : null
  );
  const [priority, setPriority] = useState<string>(pagePriority || '');
  const [audience, setAudience] = useState<string>(pageAudience || '');
  const [notes, setNotes] = useState<string>(pageNotes || '');
  const [isIframeLoading, setIsIframeLoading] = useState<boolean>(true); // Tracks iframe loading state

  // Combine state update and interaction tracking
  const handleChange = (stateUpdater: () => void) => {
    stateUpdater();
    onInteract(id); // Notify parent that this card was interacted with
  };

  useEffect(() => {
    onUpdate({
      page_id: id,
      to_keep: keepOrDelete,
      priority_name: priority || null, // null values if not selected
      audience_name: audience ? audience : null,
      notes: notes || null,
    });
  }, [keepOrDelete, priority, audience, notes]);

  const formattedPageLink = pageLink.startsWith('http') ? pageLink : `https://${pageLink}`;

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>{pageTitle}</h2>
          <div className={styles.pageViews}>
            PAGE VIEWS: <span>{pageViews}</span>
          </div>
          <div className={styles.pageLink}>
            LINK: <a href={formattedPageLink} target="_blank" rel="noopener noreferrer">{formattedPageLink}</a>
          </div>
        </div>
        <div className={styles.pageCardMiddle}>
          <div className={styles.pageScreenshot}>
            {isIframeLoading && (
              <div className={styles.loadingOverlay}>
                <div className={styles.loader}></div>
              </div>
            )}
            <iframe
              src={formattedPageLink}
              width="100%"
              height="300"
              frameBorder="0"
              onLoad={() => setIsIframeLoading(false)} // Hide loader on load
              onError={(e) => {
                console.error("Iframe failed to load:", formattedPageLink);
                (e.target as HTMLIFrameElement).style.display = 'none';
              }}
              className={styles.iframe}
              style={{
                display: isIframeLoading ? 'none' : 'block', // Hide iframe while loading
              }}
            ></iframe>
          </div>
          <div className={styles.right}>
            <div className={styles.keepOrDelete}>
              <label>KEEP</label>
              <input
                type="radio"
                name={`keep_or_delete_${id}`}
                value="keep"
                checked={keepOrDelete === true}
                onChange={() => handleChange(() => setKeepOrDelete(true))}
                required
              />
              <label>DELETE</label>
              <input
                type="radio"
                name={`keep_or_delete_${id}`}
                value="delete"
                checked={keepOrDelete === false}
                onChange={() => handleChange(() => setKeepOrDelete(false))}
              />
            </div>
            <div className="priority-container">
              <select
                value={priority}
                onChange={(e) => handleChange(() => setPriority(e.target.value))}
                disabled={keepOrDelete === false}
              >
                <option value="">Select Page Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="audience-container">
              <select
                value={audience}
                onChange={(e) => handleChange(() => setAudience(e.target.value))}
                disabled={keepOrDelete === false}
              >
                <option value="">Select Audience (optional)</option>
                <option value="students">Students</option>
                <option value="faculty">Faculty</option>
                <option value="staff">Staff</option>
              </select>
            </div>
          </div>
        </div>
        <div className={styles.notes}>
          <textarea
            value={notes}
            onChange={(e) => handleChange(() => setNotes(e.target.value))}
            placeholder="Type Notes..."
          />
        </div>
      </div>
    </div>
  );
};

export default PageCard;
