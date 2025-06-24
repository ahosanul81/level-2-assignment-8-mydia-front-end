import Idea from "@/components/modules/home/idea/Idea";
import ProfileLeft from "@/components/modules/profile/ProfileLeft";
import ProfileTop from "@/components/modules/profile/ProfileTop";

import { getMyIdea } from "@/services/idea";
import { getMe } from "@/services/user";
import React from "react";
interface MyProfilePageProps {
  params: { email: string };
}
export default async function MyProfilePage(props: MyProfilePageProps) {
  const { email } = await props.params;
  const user = await getMe(email);
  const ideas = await getMyIdea();

  return (
    <div className="">
      <div className="w-full bg-white">
        <div className="w-[70%] mx-auto">
          <ProfileTop data={user?.data} />
        </div>
      </div>
      <div className="flex  w-[70%] h-full mx-auto ">
        <div className="w-1/3">
          <ProfileLeft />
        </div>
        <div className="w-2/3">
          {Array.isArray(ideas.data) && ideas.data?.length > 0 ? (
            <Idea data={ideas.data} />
          ) : (
            <div className="flex justify-center items-center w-full h-[calc(100vh-3.5rem)] text-gray-400">
              <span className="text-4xl">You have not added any idea yet.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
