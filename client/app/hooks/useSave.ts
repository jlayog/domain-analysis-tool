"use client";

import { useState } from "react";
import { PageUpdate } from "@/app/types";

const useSave = () => {
  const [isSaving, setIsSaving] = useState(false);

  // Save multiple pages at once
  const saveMultiplePages = async (unitName: string, updates: PageUpdate[]) => {
    setIsSaving(true);

    try {
      // Validate and construct payload
      const validPayload = updates.map((update) => ({
        page_id: update.page_id,
        notes: update.notes,
        to_keep: update.to_keep === true ? 1 : 
                update.to_keep === false ? 0 : 
                null,
        priority_name: update.priority_name,
        audience_name: update.audience_name,
      }));

      console.log("Payload to send:", validPayload);

      const response = await fetch(
        `http://localhost:3001/api/${unitName}/update_pages`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validPayload),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update pages");
      }
      alert("Pages saved successfully");
      return await response.json();
    } catch (err) {
      console.error("Error saving pages:", err);
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  return { saveMultiplePages, isSaving };
};

export default useSave;
