import AddIdea from "@/components/modules/home/idea/add idea/AddIdea";
import Idea from "@/components/modules/home/idea/Idea";
import LeftSidebar from "@/components/modules/home/leftSidebar/LeftSidebar";

import RightSidebar from "@/components/modules/home/rightSidebar.tsx/RightSidebar";
import { getAllIdea } from "@/services/idea";

import React from "react";

export default async function HomePage() {
  const data = await getAllIdea();

  return (
    <div className="fixed top-0 left-0 right-0">
      <div className=" w-[90%] mx-auto flex h-screen ">
        <div className="hidden sm:block  w-1/5 mt-16 h-full">
          <LeftSidebar />
        </div>

        <div className="w-full sm:w-3/5  overflow-y-auto mx-auto mt-28 sm:mt-16">
          <div>
            <AddIdea />
          </div>
          <div className="w-full sm:w-4/5 mx-auto">
            <Idea data={data.data} />
          </div>
        </div>

        <div className="hidden sm:block w-1/5 mt-16 h-full">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
