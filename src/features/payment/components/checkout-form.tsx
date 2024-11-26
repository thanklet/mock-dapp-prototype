import { useUser } from "@/app/providers/user-provider";
import { Button } from "@/components/ui/button";
import { StripeElementsProvider } from "@/features/payment/providers/stripe-elements-provider";
import { useGetUser } from "@/features/profile/api";
import type { User } from "@/models/users";
import { path } from "@/utils/path";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import type { Stripe, StripeElements } from "@stripe/stripe-js";
import { type FormEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAddThanks, usePayment } from "../api";

export const CheckoutForm = () => {
  const [searchParams] = useSearchParams();
  const amount = Number(searchParams.get("amount"));

  return (
    <StripeElementsProvider amount={amount} currency="jpy">
      <_CheckoutForm amount={amount} />
    </StripeElementsProvider>
  );
};

const _CheckoutForm = ({ amount }: { amount: number }) => {
  const { user: authorizedUser } = useUser();
  const { data } = useGetUser({ documentId: authorizedUser.uid });
  const user = data.data();

  const stripe = useStripe();
  const elements = useElements();

  if (!(user && stripe && elements)) {
    return null;
  }

  return (
    <Component
      user={{ ...user, uid: authorizedUser.uid }}
      stripe={stripe}
      elements={elements}
      amount={amount}
    />
  );
};

const Component = ({
  user,
  stripe,
  elements,
  amount,
}: {
  user: User & {
    uid: string;
  };
  stripe: Stripe;
  elements: StripeElements;
  amount: number;
}) => {
  const [shouldShowForm, setShouldShowForm] = useState(false);
  const navigate = useNavigate();
  const { mutate: addThanks } = useAddThanks();
  const { mutate: confirmPayment } = usePayment(stripe, elements);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    confirmPayment(undefined, {
      onSuccess: () => {
        const thanks = amount / 10;
        addThanks(
          {
            documentId: user.uid,
            user,
            thanks,
          },
          {
            onSuccess: () => {
              navigate(path.get().app.wallet.appWallet.buy);
            },
          },
        );
      },
      onError: () => {
        window.alert("Failed to pay");
      },
    });
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className={`flex flex-col items-center w-full gap-y-4 ${shouldShowForm ? "block" : "hidden"}`}
    >
      <PaymentElement
        id="payment-element"
        options={{
          layout: "accordion",
        }}
        onReady={() => {
          setShouldShowForm((prev) => !prev);
        }}
        className="min-h-[320px] w-full max-w-[500px]"
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          display: "flex",
          flexDirection: "column",
          lineHeight: "20px",
        }}
      >
        Pay
      </Button>
    </form>
  );
};
