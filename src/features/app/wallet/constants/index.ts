const WALLET_MAP = {
  APP_WALLET: 1,
  CRYPTO_WALLET: 2,
} as const;

const WALLET_OPTIONS = [
  { value: WALLET_MAP.APP_WALLET, label: "app wallet" },
  {
    value: WALLET_MAP.CRYPTO_WALLET,
    label: "crypt wallet",
  },
] as const;

export { WALLET_MAP, WALLET_OPTIONS };
