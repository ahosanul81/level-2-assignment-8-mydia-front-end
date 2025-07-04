"use client";
import UserFilter from "@/components/modules/dashboard/rightSide/user/UserFilter";
import { UserTable } from "@/components/modules/dashboard/rightSide/user/UserTable";
import CommonLoadingSpinner from "@/components/modules/loadingSpinner/CommonLoadingSpinner";

import React, { Suspense } from "react";

export default function DashboardUserPage() {
  return (
    <div>
      <Suspense fallback={<CommonLoadingSpinner />}>
        <UserFilter />
        <UserTable />
      </Suspense>
    </div>
  );
}
