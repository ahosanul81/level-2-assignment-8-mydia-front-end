"use client";

import { TIdea } from "@/types/idea";
import React from "react";
import UpdateIdeaModal from "./UpdateIdeaModal";
interface UpdateIdeaProps {
  idea: TIdea;
}
export default function UpdateIdea({ idea }: UpdateIdeaProps) {
  return (
    <div>
      <UpdateIdeaModal idea={idea} />
    </div>
  );
}
