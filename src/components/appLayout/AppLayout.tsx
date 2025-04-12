import { Box } from "@mui/material";
import Sidebar from "../sideBar/Sidebar";
import HeaderBar from "../headerBar/HeaderBar";
import { green } from "@mui/material/colors";
import { THEMES } from "../../utils/colors";

type AppLayoutProps = {
    children?: JSX.Element
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <Box sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            bgcolor: THEMES.background.grey
        }} >
            <Sidebar />
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                width: "100vw",
            }}>
                <HeaderBar />
                <Box sx={{
                    margin: "1rem",
                    bgcolor: green[300],
                    borderRadius: "10px",
                    padding: "1rem"
                }}>
                    {children}
                </Box>
            </Box>
        </Box >
    )
}
