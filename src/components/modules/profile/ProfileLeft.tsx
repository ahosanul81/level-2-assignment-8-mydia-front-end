import { IUser } from "@/types/user";
import React from "react";
import {
  MdOutlineContactEmergency,
  MdOutlineMailOutline,
} from "react-icons/md";
interface ProfileLeftProps {
  user: IUser;
}
export default function ProfileLeft({ user }: ProfileLeftProps) {
  return (
    <div className="bg-white rounded-md p-4 mt-4 ">
      <h3 className="text-xl font-semibold">About</h3>
      <hr />

      <h1 className="flex items-center gap-3">
        <span>
          <MdOutlineMailOutline />
        </span>
        <span className=" break-all whitespace-normal">{user.email}</span>
      </h1>
      <h1 className="flex items-center gap-3">
        <span>
          <MdOutlineContactEmergency />
        </span>
        <span>{user.Admin?.contactNumber || user.Member?.contactNumber}</span>
      </h1>
      <h1 className="flex items-start gap-3">
        <span>
          <MdOutlineMailOutline />
        </span>
        <span>{user.Admin?.address || user.Member?.address}</span>
      </h1>
    </div>
  );
}
