import { usePostStripeIntent } from "@/features/payment/api";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_API_KEY) {
  throw new Error("Missing VITE_STRIPE_PUBLISHABLE_API_KEY");
}

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_API_KEY,
);

type Props = React.PropsWithChildren & {
  amount: number;
  currency: string;
};

export const StripeElementsProvider = ({
  amount,
  currency,
  children,
}: Props) => {
  const { data: stripeIntent } = usePostStripeIntent({
    amount,
    currency,
  });

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret: stripeIntent?.client_secret, loader: "auto" }}
    >
      {children}
    </Elements>
  );
};
