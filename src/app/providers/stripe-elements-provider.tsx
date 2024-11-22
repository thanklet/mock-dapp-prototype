import { usePostStripeIntent } from "@/features/payment/api";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_API_KEY) {
  throw new Error("Missing VITE_STRIPE_PUBLISHABLE_API_KEY");
}

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_API_KEY,
);

type Props = React.PropsWithChildren;

export const StripeElementsProvider = ({ children }: Props) => {
  const { data: stripeIntent, isStale } = usePostStripeIntent();

  // NOTE: Stripe Intentが更新された場合に画面を更新するためのワークアラウンド
  if (isStale) {
    return null;
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret: stripeIntent?.client_secret, loader: "auto" }}
    >
      {children}
    </Elements>
  );
};
