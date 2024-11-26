import { queryClient } from "@/lib/query";
import { type User, updateUser } from "@/models/users";
import type {
  Stripe,
  StripeCheckoutCurrencyOption,
  StripeElements,
} from "@stripe/stripe-js";
import { useMutation } from "@tanstack/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";

if (!import.meta.env.VITE_STRIPE_SECRET) {
  throw new Error("Missing VITE_STRIPE_SECRET");
}

const addThanks = async ({
  documentId,
  user,
  thanks,
}: {
  documentId: string;
  user: User;
  thanks: number;
}) => {
  updateUser({
    documentId,
    user: { thanks: user.thanks + thanks },
  });
};

type StripeIntent = {
  client_secret: string;
};

const postStripeIntent = async ({
  amount,
  currency,
}: Pick<
  StripeCheckoutCurrencyOption,
  "amount" | "currency"
>): Promise<StripeIntent> => {
  const res = await fetch(
    `https://api.stripe.com/v1/payment_intents?amount=${amount}&currency=${currency}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_STRIPE_SECRET}`,
      },
    },
  );
  const data = (await res.json()) as StripeIntent;

  return data;
};

export const usePostStripeIntent = (
  params: Parameters<typeof postStripeIntent>[0],
) => {
  return useSuspenseQuery({
    queryKey: [],
    queryFn: () => postStripeIntent(params),
  });
};

export const useAddThanks = () => {
  return useMutation({
    mutationFn: (params: Parameters<typeof addThanks>[0]) =>
      addThanks(params).then(() => {
        queryClient.invalidateQueries({
          queryKey: ["users", { documentId: params.documentId }],
        });
      }),
  });
};

export const usePayment = (stripe: Stripe, elements: StripeElements) => {
  return useMutation({
    mutationFn: () =>
      stripe.confirmPayment({
        elements,
        redirect: "if_required",
      }),
  });
};
