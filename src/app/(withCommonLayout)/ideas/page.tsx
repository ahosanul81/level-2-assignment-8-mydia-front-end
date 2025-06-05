import { getAllIdea } from "@/services/idea";
import React from "react";

export default async function IdeaPage() {
  const data = await getAllIdea();
  console.log(data);

  return (
    <div>
      <h1 className="bg-red-500">Get all idea </h1>
    </div>
  );
}
