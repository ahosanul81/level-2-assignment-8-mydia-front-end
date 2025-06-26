import Navbar from "@/components/shared/Navbar";
import React, { ReactNode } from "react";

export default function CommonLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-20">
        <Navbar></Navbar>
      </div>
      <div className=" bg-gray-200">{children}</div>
    </div>
  );
}
