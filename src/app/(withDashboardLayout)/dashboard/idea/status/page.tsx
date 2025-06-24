"use client";
import UpdateStatus from "@/components/modules/dashboard/rightSide/idea/update-status/UpdateStatus";

import { getAllStatusIdea } from "@/services/idea";
import { TIdea } from "@/types/idea";

import React, { useEffect, useState } from "react";

export default function UpdateIdeaPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>("pending");
  const [ideaData, setIdeaData] = useState<TIdea[]>([]);
  console.log(selectedStatus);

  useEffect(() => {
    const fetchIdea = async () => {
      const idea = await getAllStatusIdea(selectedStatus);
      setIdeaData(idea.data);
    };
    fetchIdea();
  }, [selectedStatus]);
  return (
    <>
      <div className="flex justify-end mt-6">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border border-gray-400 p-2 rounded-md"
        >
          <option disabled value="">
            Select an idea status
          </option>
          {["pending", "rejected", "approved"]?.map((value) => (
            <option key={value} value={value} className="capitalize">
              {value}
            </option>
          ))}
        </select>
      </div>
      {Array.isArray(ideaData) && !ideaData?.length ? (
        <div className="w-full h-full flex justify-center items-center">
          <span className="text-3xl text-gray-500 capitalize">
            No {selectedStatus} Idea
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-2  mx-auto gap-4 py-4">
          <UpdateStatus data={ideaData} />
        </div>
      )}
    </>
  );
}
