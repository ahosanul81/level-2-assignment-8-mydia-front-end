import UserFilter from "@/components/modules/dashboard/rightSide/user/UserFilter";
import { UserTable } from "@/components/modules/dashboard/rightSide/user/UserTable";

import React from "react";

export default async function DashboardUserPage() {
  return (
    <div className="">
      <UserFilter />
      <UserTable />
    </div>
  );
}
