// ProgressOverlay
export type ProgressOverlayProps = {
    completionPercentage: number; // Percentage of completed actions (e.g., interactions)
    onSave: () => void; // Callback to handle save action
    isSaving: boolean; // Boolean indicating if the save operation is in progress
};

// UnitListPanel
export type UnitListProps = {
    id: number; // Unique identifier for the unit
    name: string; // Unit name
    slug: string; // URL-friendly identifier for the unit
};

// Props for the PageCard component
export type PageCardProps = {
    id: number;
    pageTitle: string;
    pageViews: number;
    pageLink: string;
    pageKeepOrDelete: number | null; // 1 = true, 0 = false
    pagePriority: string | null;
    pageAudience: string | null;
    pageNotes: string | null;
    onUpdate: (updatedPage: {
        page_id: number;
        to_keep: boolean | null;
        priority_name: string | null;
        audience_name: string | null;
        notes: string | null;
    }) => void;
    onInteract: (id: number) => void; // tracking interaction with each card
};