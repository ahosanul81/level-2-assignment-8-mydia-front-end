import Idea from "@/components/modules/home/idea/Idea";
import CommonLoadingSpinner from "@/components/modules/loadingSpinner/CommonLoadingSpinner";
import ProfileLeft from "@/components/modules/profile/ProfileLeft";
import ProfileTop from "@/components/modules/profile/ProfileTop";

import { getMyIdea } from "@/services/idea";
import { getMe } from "@/services/user";
import React, { Suspense } from "react";
interface MyProfilePageProps {
  params: Promise<{ email: string }>;
}
export default async function MyProfilePage(props: MyProfilePageProps) {
  const { email } = await props.params;
  const user = await getMe(email);
  const ideas = await getMyIdea(email);

  return (
    <div className="mt-20 sm:mt-12">
      <div className="w-full bg-white">
        <div className="w-[70%] mx-auto">
          <Suspense fallback={<CommonLoadingSpinner />}>
            <ProfileTop user={user?.data} />
          </Suspense>
        </div>
      </div>
      <div className="w-full">
        <div className="flex flex-col sm:flex-row justify-between gap-4 w-[70%] h-full mx-auto">
          <div className="w-full  sm:w-1/3">
            <ProfileLeft user={user?.data} />
          </div>
          <div className="w-full sm:w-2/3 flex justify-end">
            <Suspense fallback={<CommonLoadingSpinner />}>
              {Array.isArray(ideas.data) && ideas.data?.length > 0 ? (
                <div className="w-full">
                  <Idea data={ideas.data} />
                </div>
              ) : (
                <div className="flex justify-center items-center w-full h-[calc(100vh-3.5rem)] text-gray-400 p-10">
                  <span className="text-4xl px-12">
                    You have not added any idea yet.
                  </span>
                </div>
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
