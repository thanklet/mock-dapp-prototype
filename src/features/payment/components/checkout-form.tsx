import { useUser } from "@/app/providers/user-provider";
import { Button } from "@/components/ui/button";
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
  const { user: authorizedUser } = useUser();
  const { data } = useGetUser({ documentId: authorizedUser.uid });
  const user = data.data();

  const [searchParams] = useSearchParams();
  const thanksAmount = Number(searchParams.get("thanks"));
  const stripe = useStripe();
  stripe?.elements({
    mode: "payment",
    amount: thanksAmount,
    currency: "jpy",
  });
  const elements = useElements();

  if (!(user && stripe && elements)) {
    return null;
  }

  return (
    <Component
      user={{ ...user, uid: authorizedUser.uid }}
      stripe={stripe}
      elements={elements}
      thanksAmount={thanksAmount}
    />
  );
};

const Component = ({
  user,
  stripe,
  elements,
  thanksAmount,
}: {
  user: User & {
    uid: string;
  };
  stripe: Stripe;
  elements: StripeElements;
  thanksAmount: number;
}) => {
  const [shouldShowForm, setShouldShowForm] = useState(false);
  const navigate = useNavigate();
  const { mutate: addThanks } = useAddThanks();
  const { mutate: confirmPayment } = usePayment(stripe, elements);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    confirmPayment(undefined, {
      onSuccess: () => {
        addThanks(
          {
            documentId: user.uid,
            user,
            thanks: thanksAmount,
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
