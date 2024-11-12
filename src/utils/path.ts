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
        cryptWallet: {
          transfer: "/app/wallet/crypt-wallet/transfer",
          swap: "/app/wallet/crypt-wallet/swap",
          exchange: "/app/wallet/crypt-wallet/exchange",
        },
      },
      cryptoWallet: {
        transfer: "/app/crypto-wallet/transfer",
        swap: "/app/crypto-wallet/swap",
        exchange: {
          digitalGift: "/app/crypto-wallet/exchange/digital-gift",
          token: "/app/crypto-wallet/exchange/token",
          complete: "/app/crypto-wallet/exchange/complete",
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
