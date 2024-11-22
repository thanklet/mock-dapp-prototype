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
  // NOTE: client secretを生成するために必須なので、ダミーのamountとcurrencyを指定してている。
  //       本来は決済が開始処理の時点でclient secretを生成するため、Providerのpropsとして渡しているのが誤りと思われる。
  //       しかし、Providerにclient secretを渡さないと、PaymentElementを使用できないため、このような実装にしている。
  const { data: stripeIntent, isStale } = usePostStripeIntent({
    amount: 1000,
    currency: "usd",
  });

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
