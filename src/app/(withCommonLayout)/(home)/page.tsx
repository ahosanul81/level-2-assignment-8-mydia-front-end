import AddIdea from "@/components/modules/home/idea/add idea/AddIdea";
import Idea from "@/components/modules/home/idea/Idea";
import LeftSidebar from "@/components/modules/home/leftSidebar/LeftSidebar";

import RightSidebar from "@/components/modules/home/rightSidebar.tsx/RightSidebar";
import { getAllIdea } from "@/services/idea";

import React from "react";

export default async function HomePage() {
  const data = await getAllIdea();

  return (
    <div className=" flex fixed top-0 left-0 right-0 h-screen bg-gray-200">
      <div className="w-1/5 mt-18 h-full">
        <LeftSidebar />
      </div>

      <div className="w-3/5  overflow-y-auto mx-auto mt-16">
        <AddIdea />
        <div className="w-4/5 mx-auto">
          <Idea data={data.data} />
        </div>
      </div>

      <div className="w-1/5 mt-18 h-full">
        <RightSidebar />
      </div>
    </div>
  );
}
