export type TComment = {
  id: string;
  member: TMember;
  ideaId: string;
  text: string;
  parentId: string;
  parent: TParent;
  replies: {
    id: string;
    memberId: string;
    ideaId: string;
    text: string;
    parentId: string;
    parent: string;
    createdAt: Date;
    updatedAt: Date;
  };

  createdAt: Date;
  updatedAt: Date;
};
export type TVote = {
  id: string;
  memberId: string;
  ideaId: string;
  upVote?: number;
  downVote?: number;
  createdAt: Date;
  updatedAt: Date;
};

type TMember = {
  id: string;
  name: string;
  email: string;
  profilePhoto: string;
};
type TParent = {
  id: string;
  name: string;
  email: string;
};

export type TIdea = {
  id: string;
  title: string;
  problemStatement: string;
  proposedSolution?: string;
  description: string;
  imageUrls: string[];
  isPaid: boolean;
  price: number;
  status?: "pending" | "rejected" | "approved";
  feedbackOfRejection?: string;
  member: TMember;
  category: { id: string; categoryName: string };
  comments?: TComment[];
  votes?: TVote[];
  isDeleted?: string;
  createdAt?: string;
  updatedAt?: string;
};
