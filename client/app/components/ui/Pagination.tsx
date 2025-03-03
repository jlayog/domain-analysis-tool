import React, { useState, useEffect } from "react";
import PageCard from "./PageCard";
import Grid from "../layout/Grid";
import ProgressOverlay from "../features/ProgressOverlay";
import useSave from "@/app/hooks/useSave";
import styles from "./Pagination.module.css";
import { PageUpdate, PageItem } from "@/app/types";

type PaginationProps = {
    data: PageItem[]; // Replaced any[] with PageItem[]
    itemsPerPage: number;
    onUpdateData: (updatedData: PageItem[]) => void; // Updated type
    onSave: (filteredData: PageItem[]) => void; // Updated type
    unit: string;
    isSaving: boolean;
};

const Pagination: React.FC<PaginationProps> = ({
    data = [],
    itemsPerPage,
    onUpdateData,
    unit,
    isSaving,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState<PageItem[]>([]); // Replaced any[]
    const [interactedIds, setInteractedIds] = useState<Set<number>>(new Set());
    const [directPage, setDirectPage] = useState<string>("");

    const { saveMultiplePages } = useSave();

    const MAX_VISIBLE_PAGES = 7;
    const SHOW_INPUT_THRESHOLD = 12;

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const newItems = data.slice(startIndex, startIndex + itemsPerPage);
        setCurrentItems(newItems);
    }, [currentPage, data, itemsPerPage]);

    // Updated parameter type to PageUpdate
    const handlePageUpdate = (updatedPage: PageUpdate) => {
        const updatedData = data.map((page) =>
            page.id === updatedPage.page_id ? {
                ...page,
                to_keep: updatedPage.to_keep,
                page_priority: updatedPage.priority_name,
                page_audience: updatedPage.audience_name, 
                notes: updatedPage.notes
            } : page
        );
        onUpdateData(updatedData);
    };

    const handleInteract = (id: number) => {
        setInteractedIds((prev) => new Set(prev).add(id));
    };

    const handleSave = async () => {
        try {
            const interactedData = data.filter((page) => interactedIds.has(page.id));

            const validData = interactedData.map((item) => {
                if (!item.id) {
                    console.error("Missing id in item:", item);
                    throw new Error("Missing id in item.");
                }

                return {
                    page_id: item.id,
                    notes: item.notes || "",
                    to_keep: item.to_keep !== undefined ? item.to_keep : null,
                    priority_name: item.page_priority || null,
                    audience_name: item.page_audience || null,
                };
            });
            await saveMultiplePages(unit, validData);
            setInteractedIds(new Set());

            const response = await fetch(`http://localhost:3001/api/${unit}/pages`);
            const updatedData = await response.json();
            onUpdateData(updatedData);
        } catch (err) {
            console.error("Error saving data:", err);
        }
    };


    const handlePaginationClick = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDirectPageSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const pageNumber = parseInt(directPage, 10);
        if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            window.scrollTo({ top: 0, behavior: "smooth" });
            setDirectPage("");
        }
    };

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const getVisiblePages = () => {
        const visiblePages = [];
        const half = Math.floor(MAX_VISIBLE_PAGES / 2);

        if (totalPages <= MAX_VISIBLE_PAGES) {
            for (let i = 1; i <= totalPages; i++) {
                visiblePages.push(i);
            }
        } else {
            if (currentPage <= half) {
                for (let i = 1; i <= MAX_VISIBLE_PAGES - 2; i++) {
                    visiblePages.push(i);
                }
                visiblePages.push("...");
                visiblePages.push(totalPages);
            } else if (currentPage > totalPages - half) {
                visiblePages.push(1);
                visiblePages.push("...");
                for (let i = totalPages - (MAX_VISIBLE_PAGES - 2); i <= totalPages; i++) {
                    visiblePages.push(i);
                }
            } else {
                visiblePages.push(1);
                visiblePages.push("...");
                for (let i = currentPage - half + 2; i <= currentPage + half - 2; i++) {
                    visiblePages.push(i);
                }
                visiblePages.push("...");
                visiblePages.push(totalPages);
            }
        }
        return visiblePages;
    };

    return (
        <div>
            <ProgressOverlay
                completionPercentage={
                    data.length > 0
                        ? Math.floor((interactedIds.size / data.length) * 100)
                        : 0
                }
                onSave={handleSave}
                isSaving={isSaving}
            />
            <Grid>
                {currentItems.map((page) => (
                    <PageCard
                        key={page.id}
                        id={page.id}
                        pageTitle={page.name}
                        pageLink={page.link || "#"}
                        pageKeepOrDelete={page.to_keep === null ? null : Number(page.to_keep)}
                        pagePriority={page.page_priority}
                        pageAudience={page.page_audience}
                        pageNotes={page.notes}
                        pageViews={page.page_views || 0}
                        onUpdate={handlePageUpdate}
                        onInteract={handleInteract}
                    />
                ))}
            </Grid>
            <div className={styles.pagination}>
                {getVisiblePages().map((page, index) => (
                    <button
                        key={index}
                        onClick={() => typeof page === "number" && handlePaginationClick(page)}
                        className={`${styles.pageNumber} ${currentPage === page ? styles.selected : ""
                            }`}
                        disabled={page === "..."}
                    >
                        {page}
                    </button>
                ))}
                {totalPages > SHOW_INPUT_THRESHOLD && (
                    <form
                        onSubmit={handleDirectPageSubmit}
                        className={styles.directPageForm}
                    >
                        <label htmlFor="directPage">Go to page: </label>
                        <input
                            type="number"
                            id="directPage"
                            value={directPage}
                            onChange={(e) => setDirectPage(e.target.value.trim())}
                            min="1"
                            max={totalPages}
                            placeholder="Page #"
                        />
                        <button type="submit">Go</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Pagination;
