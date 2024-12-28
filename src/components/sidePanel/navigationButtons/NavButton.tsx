import { Button } from "@mui/material";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type NavButtonProps = {
  children: ReactNode;
  route: string;
};

export default function ({ children, route }: NavButtonProps) {
  return (
    <NavLink to={route} style={{ width: "-webkit-fill-available" }}>
      {({ isActive }) => (
        <Button
          variant={`${isActive ? "contained" : "outlined"}`}
          sx={{
            gap: "10px",
            width: "-webkit-fill-available",
          }}
        >
          {children}
        </Button>
      )}
    </NavLink>
  );
}
