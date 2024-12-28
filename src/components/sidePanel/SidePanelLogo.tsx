import { CurrencyExchangeSharp } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { COMMONS } from "../../assets/commons/text";

export default function SidePanelLogo() {
  const sidePanelLogoStyles = {
    background: "#292b4f",
    color: "white",
    width: "-webkit-fill-available",
    display: "flex",
    justifyContent: "center",
    gap: "5px",
    padding: "20px",
  };
  return (
    <Typography sx={sidePanelLogoStyles}>
      <CurrencyExchangeSharp />
      {COMMONS.TITLE}
    </Typography>
  );
}
