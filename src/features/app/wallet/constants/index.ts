const WalletEnum = {
  APP_WALLET: 1,
  CRYPTO_WALLET: 2,
} as const;

const walletOptions = [
  { value: WalletEnum.APP_WALLET, label: "app wallet" },
  {
    value: WalletEnum.CRYPTO_WALLET,
    label: "crypto wallet",
  },
] as const;

export { WalletEnum, walletOptions };
