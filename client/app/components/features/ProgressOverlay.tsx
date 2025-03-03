"use client";

import React from "react";
import styles from "./ProgressOverlay.module.css";

type ProgressOverlayProps = {
    completionPercentage: number; // Ensure this is a valid number
    onSave: () => void;
    isSaving: boolean;
};

const ProgressOverlay: React.FC<ProgressOverlayProps> = ({
    completionPercentage,
    onSave,
    isSaving,
}) => {
    // Clamp completionPercentage between 0 and 100 for safety
    const safePercentage = Math.max(0, Math.min(100, completionPercentage));

    return (
        <div className={styles.overlay}>
            <div className={styles.progressContainer}>
                <div className={styles.progressBar}>
                    <label>Progress</label>
                    <progress
                        className={styles.progressBar}
                        max="100"
                        value={safePercentage}
                    ></progress>
                </div>
                <span className={styles.percentLabel}>{safePercentage}%</span>
            </div>
            <button onClick={onSave} disabled={isSaving} className={styles.save}>
                {isSaving ? "Saving..." : "Save"}
            </button>
        </div>
    );
};

export default ProgressOverlay;
