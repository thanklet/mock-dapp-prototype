import { CheckoutForm } from "@/features/payment/components/checkout-form";

export const CheckoutRoute = () => {
  return (
    <div className="flex flex-col gap-y-5 items-center pt-[30px] px-5">
      <CheckoutForm />
    </div>
  );
};
