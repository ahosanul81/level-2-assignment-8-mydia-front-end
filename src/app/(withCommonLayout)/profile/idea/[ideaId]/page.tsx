import React from "react";
interface UpdateIdeaPageProps {
  params: Promise<{ ideaId: string }>;
}
export default async function UpdateIdeaPage({ params }: UpdateIdeaPageProps) {
  console.log(await params);

  return <div>page</div>;
}
