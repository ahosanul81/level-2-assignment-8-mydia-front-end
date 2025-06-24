/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { CustomDropdown } from "@/components/reUseableComponent/dropdown/CustomDropdown";
import { updateIdeaStatus } from "@/services/idea";
// import { useUser } from "@/context/UserContext";
import { TIdea } from "@/types/idea";
import defaultUserIcon from "@/utils/defaultUserIcon";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import Image from "next/image";
import React, { useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { toast } from "sonner";
interface UpdateStatusProps {
  data: TIdea[];
}
export default function UpdateStatus({ data }: UpdateStatusProps) {
  //   const { user } = useUser();
  const [expandId, setExpandId] = useState<string | null>(null);
  const [updatedStatus, setUpdatedStatus] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectStatus, setSelectedStatus] = useState<string>("");
  const handeleStatus = async (ideaId: string, status: string) => {
    setUpdatedStatus((prev) => ({ ...prev, [ideaId]: !prev[ideaId] }));
    setSelectedStatus(status);
    try {
      const res = await updateIdeaStatus(ideaId, status);
      console.log(res);

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error);
    }
  };
  return (
    <>
      {data?.map(
        ({
          id,
          title,
          problemStatement,
          //   proposedSolution,
          description,
          imageUrls,
          isPaid,
          price,
          member,
          category,
          status,
          createdAt,
        }: TIdea) => {
          // transform date
          const isoDate = createdAt;
          const date = new Date(isoDate ?? "");

          const formattedDateOfCreatedAt = date.toLocaleString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });

          return (
            <Card
              key={id}
              className="max-w-3xl px-3 border-1 bg-white  rounded-md"
            >
              <CardHeader className="flex flex-col justify-start items-start">
                <div className="w-full flex justify-between mb-2 relative">
                  <div className="flex gap-3">
                    <Image
                      alt="profile photo"
                      src={member.profilePhoto || defaultUserIcon}
                      width={50}
                      height={50}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h1>{member.name}</h1>
                      <p className="text-xs">{formattedDateOfCreatedAt}</p>
                    </div>
                  </div>
                  <div>
                    <CustomDropdown
                      triggerButton={
                        <button
                          className={`${
                            (status === "pending" && "bg-amber-200") ||
                            (status === "rejected" && "bg-red-400") ||
                            (status === "approved" &&
                              "bg-green-100 border border-green-200")
                          }  capitalize px-4 py-1 rounded-xl`}
                        >
                          {!updatedStatus[id] ? status : selectStatus}
                        </button>
                      }
                      items={[
                        { value: "pending", option: "pending" },
                        { value: "approved", option: "approved" },
                        { value: "rejected", option: "rejected" },
                      ]}
                      selectedValueFn={(value) => handeleStatus(id, value)}
                    />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-semibold ">{title}</h1>
                  <p className="text-gray-500 ">{problemStatement}</p>
                </div>
              </CardHeader>

              <CardBody className=" py-0 text-small text-default-400">
                <div className="flex gap-3">
                  {imageUrls &&
                    imageUrls.length > 0 &&
                    imageUrls?.map((image: string, index: number) => (
                      <Image
                        key={index}
                        width={100}
                        height={70}
                        src={image}
                        className="rounded-xl"
                        alt={`${title}`}
                      />
                    ))}
                </div>
                <p className="bg-gray-200 rounded-sm px-2 mt-2">
                  {description.slice(1, 100)}
                  <a
                    onClick={() => setExpandId(id)}
                    className="text-blue-400 hover:underline "
                  >
                    {expandId !== id && "....more"}
                  </a>
                  {expandId && expandId === id && description}
                  <span
                    className="text-gray-500"
                    onClick={() => setExpandId(null)}
                  >
                    {expandId && " less"}
                  </span>
                </p>
                <span className="flex gap-3 pt-2 ">
                  <span className="bg-green-200 rounded-sm px-3">
                    {isPaid ? "PAID" : "FREE"}
                  </span>
                  {isPaid && (
                    <span className="bg-amber-600 text-white rounded-sm px-3">
                      <span className="flex items-center ">
                        <TbCurrencyTaka /> {price}
                      </span>
                    </span>
                  )}
                  <span className="bg-green-800 text-white rounded-sm px-3 capitalize">
                    {category?.categoryName}
                  </span>
                </span>
              </CardBody>

              <CardFooter className="gap-3"></CardFooter>
            </Card>
          );
        }
      )}
    </>
  );
}
