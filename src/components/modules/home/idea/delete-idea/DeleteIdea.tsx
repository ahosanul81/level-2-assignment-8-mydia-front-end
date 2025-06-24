"use client";
import { deleteIdeaById } from "@/services/idea";
import React from "react";
import { toast } from "sonner";
import { MdDeleteOutline } from "react-icons/md";

interface DeleteIdeaProps {
  ideaId: string;
  //   setDeleteIdea: React.Dispatch<React.SetStateAction<string>>;
}

export default function DeleteIdea({ ideaId }: DeleteIdeaProps) {
  const handleDeleteIdea = async (ideaId: string) => {
    try {
      const res = await deleteIdeaById(ideaId);
      console.log(res);

      if (res.success) {
        toast.success("Idea deleted successfully");
      } else {
        toast.error("Failed to delete idea");
      }
    } catch (error) {
      toast.error("An error occurred during deletion");
      console.error(error);
    }
  };
  return (
    <div>
      <button
        onClick={() => handleDeleteIdea(ideaId)}
        className="flex items-center gap-2"
      >
        {" "}
        <span>
          <MdDeleteOutline />
        </span>{" "}
        <span>Delete</span>
      </button>
    </div>
  );
}
