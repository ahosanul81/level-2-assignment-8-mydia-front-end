import PaymentTable from "@/components/modules/dashboard/rightSide/payment/PaymentTable";
import { getAllPaymentCompleted } from "@/services/payment";

export default async function PaymentCompletePage() {
  const data = await getAllPaymentCompleted();

  return (
    <div>
      <PaymentTable data={data.data} />
    </div>
  );
}
