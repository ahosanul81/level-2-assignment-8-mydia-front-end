// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { CustomDropdown } from "@/components/reUseableComponent/dropdown/CustomDropdown";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { getAllUser, updateUserStatus } from "@/services/user";
// import { IUser } from "@/types/user";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";

// export function UserTable() {
//   // const [selectedStatus, setSelectedStatus] = useState<string>("");
//   const [updatedStatus, setUpdatedStatus] = useState<{
//     [key: string]: boolean;
//   }>({});
//   const [selectStatus, setSelectedStatus] = useState<string>();
//   const searchParams = useSearchParams();
//   const status: string | null = searchParams.get("status");
//   const role: string | null = searchParams.get("role");

//   const [userData, setUserData] = useState<IUser[]>([]);
//   console.log(selectStatus);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const users = await getAllUser({ role, status });
//       setUserData(users.data);
//     };
//     fetchUsers();
//   }, [status, role]);

//   const handeleStatus = async (userId: string, status: string) => {
//     setUpdatedStatus((prev) => ({ ...prev, [userId]: !prev[userId] }));
//     setSelectedStatus(status);
//     try {
//       const res = await updateUserStatus(userId, { status });
//       console.log(res);

//       if (res.success) {
//         toast.success(res.message);
//       } else {
//         toast.error(res.message);
//       }
//     } catch (error: any) {
//       toast.error(error.message || "something went wrong");
//     }
//   };
//   return (
//     <Table>
//       <TableCaption>The rest of user information</TableCaption>
//       <TableHeader>
//         <TableRow>
//           <TableHead className="w-[100px]">Name</TableHead>
//           <TableHead>Email</TableHead>
//           <TableHead>Role</TableHead>
//           <TableHead className="text-right">Status</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {Array.isArray(userData) &&
//           userData.map(({ id, name, email, role, status }) => {
//             const currentStatus = updatedStatus[id] || status;
//             console.log(currentStatus);

//             return (
//               <TableRow key={id}>
//                 <TableCell className="font-medium">{name}</TableCell>
//                 <TableCell>{email}</TableCell>
//                 <TableCell>{role}</TableCell>
//                 <TableCell className="text-right">
//                   <div>
//                     <CustomDropdown
//                       triggerButton={
//                         <button
//                           className={`${
//                             (updatedStatus[id] && selectStatus === "active") ||
//                             (status === "active" && "bg-amber-200") ||
//                             (updatedStatus[id] && selectStatus === "blocked") ||
//                             (status === "blocked" && "bg-red-400") ||
//                             (updatedStatus[id] && selectStatus === "deleted") ||
//                             (status === "deleted" &&
//                               "bg-red-300 border border-green-200")
//                           }  capitalize px-4 py-1 rounded-xl`}
//                         >
//                           {!updatedStatus[id] ? status : selectStatus}
//                         </button>
//                       }
//                       items={[
//                         { value: "active", option: "active" },
//                         { value: "blocked", option: "block" },
//                         { value: "deleted", option: "delete" },
//                       ]}
//                       selectedValueFn={(value) => handeleStatus(id, value)}
//                     />
//                   </div>
//                 </TableCell>
//               </TableRow>
//             );
//           })}
//       </TableBody>
//       <TableFooter>
//         <TableRow></TableRow>
//       </TableFooter>
//     </Table>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { CustomDropdown } from "@/components/reUseableComponent/dropdown/CustomDropdown";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllUser, updateUserStatus } from "@/services/user";
import { IUser } from "@/types/user";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function UserTable() {
  const [updatedStatus, setUpdatedStatus] = useState<{
    [userId: string]: string;
  }>({});

  const searchParams = useSearchParams();
  const status: string | null = searchParams.get("status");
  const role: string | null = searchParams.get("role");
  const page: string | null = searchParams.get("page");
  const limit: string | null = searchParams.get("limit");

  const [userData, setUserData] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUser({ role, status, page, limit });
      setUserData(users.data);
    };
    fetchUsers();
  }, [status, role, page, limit]);

  const handleStatus = async (userId: string, status: string) => {
    setUpdatedStatus((prev) => ({ ...prev, [userId]: status }));

    try {
      const res = await updateUserStatus(userId, { status });

      if (res.success) {
        toast.success(res.message);

        // Optional: Update the actual user status in local userData
        setUserData((prev) =>
          prev.map((user) => (user.id === userId ? { ...user, status } : user))
        );
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <Table>
      <TableCaption>The rest of user information</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userData.map(({ id, name, email, role, status }) => {
          const currentStatus = updatedStatus[id] || status;

          const statusColor =
            currentStatus === "active"
              ? "bg-amber-100 text-black"
              : currentStatus === "blocked"
              ? "bg-red-200 "
              : currentStatus === "deleted"
              ? "bg-red-300 text-black "
              : "bg-gray-200";

          return (
            <TableRow key={id}>
              <TableCell className="font-medium">{name}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{role}</TableCell>
              <TableCell className="text-right">
                <CustomDropdown
                  triggerButton={
                    <button
                      className={`capitalize px-4 py-1 rounded-xl text-sm transition-all duration-300 ${statusColor}`}
                    >
                      {currentStatus}
                    </button>
                  }
                  items={[
                    { value: "active", option: "active" },
                    { value: "blocked", option: "block" },
                    { value: "deleted", option: "delete" },
                  ]}
                  selectedValueFn={(value) => handleStatus(id, value)}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow></TableRow>
      </TableFooter>
    </Table>
  );
}
