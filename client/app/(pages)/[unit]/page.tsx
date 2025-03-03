"use client";

import React, { useState, useEffect } from "react";
import Pagination from "@/app/components/ui/Pagination";
import useSave from "@/app/hooks/useSave";
import { PageItem, PageUpdate } from "@/app/types";

const UnitPage = ({ params }: { params: { unit: string } }) => {
  const { unit } = params;
  const [unitData, setUnitData] = useState<PageItem[]>([]);
  const { saveMultiplePages, isSaving } = useSave();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3001/api/${unit}/pages`);
      const data = await response.json();
      setUnitData(data);
    };
    fetchData();
  }, [unit]);

  const handleSave = (filteredData: PageItem[]) => {
    // Convert PageItem[] to PageUpdate[]
    const updates: PageUpdate[] = filteredData.map(item => ({
      page_id: item.id,
      notes: item.notes,
      to_keep: item.to_keep,
      priority_name: item.page_priority || null,
      audience_name: item.page_audience || null
    }));

    saveMultiplePages(unit, updates).catch((err) =>
      console.error("Error saving data:", err)
    );
  };
  
  return (
    <Pagination
      data={unitData}
      itemsPerPage={10}
      onUpdateData={setUnitData}
      onSave={handleSave} // Pass save function
      isSaving={isSaving}
      unit={unit}
    />
  );
};

export default UnitPage;
