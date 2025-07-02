import Navbar from "@/components/shared/navbar/Navbar";
import React, { ReactNode } from "react";

export default function CommonLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="bg-white fixed top-0 left-0 w-full z-20">
        <div className="w-[95%] mx-auto">
          <Navbar />
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
