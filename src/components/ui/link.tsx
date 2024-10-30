import { Link as MuiLink, type LinkProps as MuiLinkProps } from "@mui/material";
import { type ComponentProps, forwardRef } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

type LinkProps = MuiLinkProps & {
  to: ComponentProps<typeof ReactRouterLink>["to"];
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { to, ...props },
  ref,
) {
  return (
    <MuiLink
      component={ReactRouterLink}
      to={to}
      ref={ref}
      {...props}
      sx={{
        textDecoration: "none",
      }}
    />
  );
});
