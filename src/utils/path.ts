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
      dashboard: () => "/app/dashboard",
      staking: () => "/app/staking",
      swap: () => "/app/swap",
      thanks: {
        location: () => "/app/thanks/location",
        send: (receiveUserId: string | undefined) =>
          `/app/thanks/send/${receiveUserId}`,
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
