import { Stack } from "@mui/material";
import { ReactNode } from "react";

export default function SidePanelContent({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <Stack direction="column" alignItems="center" gap="1rem">
      {children}
    </Stack>
  );
}
