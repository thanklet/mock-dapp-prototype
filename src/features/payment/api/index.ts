import { queryClient } from "@/lib/query";
import { type User, updateUser } from "@/models/users";
import type { Stripe, StripeElements } from "@stripe/stripe-js";
import { useMutation } from "@tanstack/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";

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

const postStripeIntent = async (): Promise<StripeIntent> => {
  const res = await fetch(
    "https://api.stripe.com/v1/payment_intents?amount=1099&currency=usd",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer sk_test_09l3shTSTKHYCzzZZsiLl2vA",
      },
    },
  );
  const data = (await res.json()) as StripeIntent;

  return data;
};

export const usePostStripeIntent = () => {
  return useSuspenseQuery({
    queryKey: ["stripe-api-key"],
    queryFn: postStripeIntent,
  });
};

export const useAddThanks = () => {
  return useMutation({
    mutationFn: (params: Parameters<typeof addThanks>[0]) =>
      addThanks(params).then(() => {
        queryClient.invalidateQueries({
          queryKey: ["users", { documentId: params.documentId }],
        });
        console.log("invalidate stripe api key");
        queryClient.invalidateQueries({
          queryKey: ["stripe-api-key"],
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
