export interface IPayment {
  id: string;
  ideaId: string;
  idea: {
    id: string;
    title: string;
    category: {
      id: string;
      categoryName: string;
    };
  };
  memberId: string;
  member: {
    id: string;
    name: string;
    email: string;
  };
  status: "un_paid" | "paid";
  paymentGatewayData: {
    amount?: string;
    bank_tran_id?: string;
  };
  createdAt: string;
  updatedAt?: Date;
}
