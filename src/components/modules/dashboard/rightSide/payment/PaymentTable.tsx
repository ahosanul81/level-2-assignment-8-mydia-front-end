import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IPayment } from "@/types/payment";
import { formateDate } from "@/utils/formateDate";

import React from "react";
interface PaymentTableProps {
  data: IPayment[];
}
export default function PaymentTable({ data }: PaymentTableProps) {
  return (
    <Table>
      <TableCaption>The rest of user information</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Idea Name</TableHead>
          <TableHead className="w-[100px]">Idea Category</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Owner Email</TableHead>
          <TableHead className="text-right">Idea Price</TableHead>
          <TableHead className="text-left">TrXId</TableHead>
          <TableHead className="text-right">Status</TableHead>
          <TableHead className="text-right">Payment Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map(
          ({ id, idea, member, paymentGatewayData, status, createdAt }) => {
            return (
              <TableRow key={id}>
                <TableCell className="font-medium">{idea.title}</TableCell>
                <TableCell className="font-medium">
                  {idea.category.categoryName}
                </TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{paymentGatewayData.amount}</TableCell>
                <TableCell>{paymentGatewayData.bank_tran_id}</TableCell>
                <TableCell className="text-right">{status}</TableCell>
                <TableCell className="text-right">{`${formateDate(
                  createdAt
                )}`}</TableCell>
              </TableRow>
            );
          }
        )}
      </TableBody>
      <TableFooter>
        <TableRow></TableRow>
      </TableFooter>
    </Table>
  );
}
