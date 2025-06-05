import Idea from "@/components/modules/home/idea/Idea";
import LeftSidebar from "@/components/modules/home/leftSidebar/LeftSidebar";

import RightSidebar from "@/components/modules/home/rightSidebar.tsx/RightSidebar";
import { getAllIdea } from "@/services/idea";

import React from "react";

export default async function HomePage() {
  const data = await getAllIdea();
  return (
    <div className=" flex fixed top-0 left-0 right-0 h-screen">
      <div className="w-1/5 mt-18 bg-gray-100 h-full">
        <LeftSidebar />
      </div>

      <div className="  bg-white mt-18 overflow-y-auto mx-auto h-full">
        <Idea data={data.data} />
      </div>

      <div className="w-1/5 mt-18 bg-gray-100 h-full">
        <RightSidebar />
      </div>
    </div>
  );
}
