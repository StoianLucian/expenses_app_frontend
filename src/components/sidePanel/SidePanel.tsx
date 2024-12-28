import { Box } from "@mui/material";
import SidePanelLogo from "./SidePanelLogo";
import SidePanelContent from "./SidePanelContent";
import { Add, ManageAccounts, ShowChart, TableView } from "@mui/icons-material";

import NavButton from "./navigationButtons/NavButton";
import { COMMONS } from "../../assets/commons/text";

export default function SidePanel() {
  const sidePanelStyles = {
    width: "15vw",
    height: "100vh",
    background: "#12143d",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    boxSizing: "border-box",
    paddingBottom: "20px",
    "@media (max-width: 1024px)": {
      width: "25vw",
    },
    "@media (max-width: 780px)": {
      width: "30vw",
    },
  };

  return (
    <Box sx={sidePanelStyles}>
      <SidePanelLogo />
      <SidePanelContent>
        <NavButton route="/">
          <Add /> {COMMONS.ADD_EXPENSE}
        </NavButton>
        <NavButton route="/expenses">
          <TableView /> {COMMONS.ADD_EXPENSE}
        </NavButton>
        <NavButton route="/expenses/charts">
          <ShowChart /> {COMMONS.CHARTS}
        </NavButton>
      </SidePanelContent>
      <SidePanelContent>
        <NavButton route="/settings">
          <ManageAccounts />
          {COMMONS.SETTINGS}
        </NavButton>
      </SidePanelContent>
    </Box>
  );
}
