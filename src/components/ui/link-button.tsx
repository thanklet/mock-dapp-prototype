import type { ButtonProps } from "@mui/material";
import MuiButton from "@mui/material/Button";
import { forwardRef } from "react";
import { Link } from "react-router-dom";

type LinkButtonProps = ButtonProps & {
  to: string;
};

export const LinkButton = forwardRef<HTMLButtonElement, LinkButtonProps>(
  (props, ref) => {
    const { to, ...buttonProps } = props;
    return <MuiButton component={Link} to={to} ref={ref} {...buttonProps} />;
  },
);
