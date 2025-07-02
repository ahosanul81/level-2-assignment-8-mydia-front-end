import PaymentTable from "@/components/modules/dashboard/rightSide/payment/PaymentTable";
import CommonLoadingSpinner from "@/components/modules/loadingSpinner/CommonLoadingSpinner";
import { getAllPaymentCompleted } from "@/services/payment";
import { Suspense } from "react";

export default async function PaymentCompletePage() {
  const data = await getAllPaymentCompleted();

  return (
    <Suspense fallback={<CommonLoadingSpinner />}>
      <PaymentTable data={data?.data} />
    </Suspense>
  );
}
