import DashBoardLeftSidebar from "@/components/modules/dashboard/leftSide/DashBoardLeftSidebar";
import Navbar from "@/components/shared/Navbar";
import React, { ReactNode } from "react";

export default function CommonLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-20 bg-white shadow">
        <Navbar />
      </div>

      {/* Page Content */}
      <div className="w-full flex gap-6 fixed top-0 left-0 right h-screen mt-14 bg-gray-200">
        <aside className="w-1/4  bg-white shadow z-10">
          <DashBoardLeftSidebar />
        </aside>
        {/* Main Content */}
        <main className="min-w-3/4 overflow-y-auto mx-auto h-full pr-4 mt-3">
          {children}
        </main>
      </div>
    </div>
  );
}
