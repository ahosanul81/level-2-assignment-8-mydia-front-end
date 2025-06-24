"use server";
import React from "react";
import AddIdeaModal from "./AddIdeaModal";
import { ideaCategories } from "@/services/category";

export default async function AddIdea() {
  const categories = await ideaCategories();

  return (
    <div className="flex items-center justify-center w-full  px-3  mx-auto rounded-md py-3">
      <AddIdeaModal
        categories={categories?.data}
        defaultValues={{
          title: "",
          problemStatement: "",
          proposedSolution: "",
          isPaid: false,
          price: undefined,
          description: "",
          categoryId: "",
        }}
      />
    </div>
  );
}
