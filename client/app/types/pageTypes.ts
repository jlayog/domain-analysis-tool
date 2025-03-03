// Type definitions for the application, holds all the properties and methods used in the application
// These types are used both in pages and components.


// Type for the payload expected by saveMultiplePages
export interface PageUpdate {
    page_id: number;
    to_keep: boolean | null;
    priority_name: string | null;
    audience_name: string | null;
    notes: string | null;
}

// Type for [Unit] data (used in the state)
export type PageItem = {
    id: number; // Unique identifier for the page
    name: string; // Page name or title
    link: string; // Page URL or link
    to_keep: boolean | null; // Indicates if the page is marked to keep (true), delete (false), or undecided (null)
    page_priority: string | null; // Priority of the page (e.g., "high", "medium", "low")
    page_audience: string | null; // Target audience for the page (e.g., "students", "faculty", "staff")
    notes: string | null; // Additional notes about the page
    page_views: number; // Number of views the page has received
};

// App home page
export interface HomePageUnit {
    id: number;
    name: string;
    origin_url: string | null;
    slug: string;
    page_count: number;
    completed: boolean;
}