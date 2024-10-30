export class Path {
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
      userId: {
        dashboard: (userId: string | undefined) => `/app/${userId}/dashboard`,
        staking: (userId: string | undefined) => `/app/${userId}/staking`,
        swap: (userId: string | undefined) => `/app/${userId}/swap`,
        thanks: {
          location: (userId: string | undefined) =>
            `/app/${userId}/thanks/location`,
          send: (
            userId: string | undefined,
            receiveUserId: string | undefined,
          ) => `/app/${userId}/thanks/send/${receiveUserId}`,
        },
      },
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
