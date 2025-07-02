import Link from "next/link";
import React from "react";

export default function DashBoardLeftSidebar() {
  const user = [{ to: "/dashboard/user/status", title: "status" }];
  const idea = [{ to: "/dashboard/idea/status", title: "update status" }];
  return (
    <div className="relative flex  h-screen w-full max-w-[17rem] flex-col rounded-xl  bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5">
      <h2 className="text-lg font-semibold mb-4">Dashboard</h2>

      <nav className="flex min-w-[240px] flex-col gap-4 p-2 font-sans text-base font-normal text-blue-gray-700">
        {/* user Section */}
        <div>
          <p className="text-sm text-gray-500 mb-2 uppercase">User</p>
          <ul className="flex flex-col ml-2 space-y-1">
            {Array.isArray(user) &&
              user.map((item) => (
                <li key={item.to} className="capitalize">
                  <Link href={item.to}>{item.title}</Link>
                </li>
              ))}
          </ul>
        </div>
        {/* Idea Section */}
        <div>
          <p className="text-sm text-gray-500 mb-2 uppercase">Idea</p>
          <ul className="flex flex-col ml-2 space-y-1">
            {Array.isArray(idea) &&
              idea.map((item) => (
                <li key={item.to} className="capitalize">
                  <Link href={item.to}>{item.title}</Link>
                </li>
              ))}
          </ul>
        </div>

        {/* Payment Section */}
        <div>
          <p className="text-sm text-gray-500 mb-2 uppercase">Payment</p>
          <ul className="ml-2 space-y-1">
            <li>
              <Link
                href="/dashboard/payment/completed"
                className="block hover:text-blue-600"
              >
                Payment
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
