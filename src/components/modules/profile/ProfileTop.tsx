import { IUser } from "@/types/user";
import defaultUserIcon from "@/utils/defaultUserIcon";
import Image from "next/image";
import React from "react";
import { CiEdit } from "react-icons/ci";

interface ProfileTopProps {
  data: IUser;
}
export default function ProfileTop({ data }: ProfileTopProps) {
  return (
    <div className="flex justify-between items-center bg-white py-3">
      <div className="flex items-center gap-3">
        <Image
          alt="profile photo"
          src={data.Member?.profilePhoto || defaultUserIcon}
          width={50}
          height={50}
          className="w-28 h-28 rounded-full"
        />
        <div>
          <h1 className="text-3xl font-bold">{data.name}</h1>
        </div>
      </div>
      <div className="">
        <span className="flex justify-center items-center gap-2 bg-gray-200 hover:bg-gray-300 rounded-xl p-2 px-3">
          <CiEdit /> Edit
        </span>
      </div>
    </div>
  );
}
