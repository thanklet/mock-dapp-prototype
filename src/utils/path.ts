class Path {
  get = () => ({
    home: "/",
    admin: {
      top: "/admin",
      users: {
        top: "/admin/users",
        userId: (userId: string | undefined) => `/admin/users/${userId}`,
      },
    },
    app: {
      dashboard: "/app/dashboard",
      staking: "/app/staking",
      swap: "/app/swap",
      thanks: {
        location: "/app/thanks/location",
        search: "/app/thanks/search",
        send: (receiveUserId: string | undefined) =>
          `/app/thanks/send/${receiveUserId}`,
      },
      wallet: {
        appWallet: {
          transfer: "/app/wallet/app-wallet/transfer",
          staking: "/app/wallet/app-wallet/staking",
          buy: "/app/wallet/app-wallet/buy",
        },
        cryptoWallet: {
          transfer: "/app/wallet/crypto-wallet/transfer",
          swap: "/app/wallet/crypto-wallet/swap",
          exchange: {
            digitalGift: "/app/wallet/crypto-wallet/exchange/digital-gift",
            token: "/app/wallet/crypto-wallet/exchange/token",
            complete: "/app/wallet/crypto-wallet/exchange/complete",
          },
        },
      },
    },
    profile: {
      top: "/profile",
      edit: "/profile/edit",
      qr: "/profile/qr",
    },
    auth: {
      top: "/auth",
      login: "/auth/login",
      signUp: "/auth/sign-up",
    },
  });

  compares(a: string, b: string) {
    return this.trimTrailingSlash(a) === this.trimTrailingSlash(b);
  }

  private trimTrailingSlash = (pathname: string): string => {
    return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  };
}

export const path = new Path();
