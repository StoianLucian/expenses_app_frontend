import { Avatar, Box } from '@mui/material'
import { THEMES } from '../../utils/colors'
import ExpensesLogo from '../../assets/images/expensesLogo.png'
import { ROUTES } from '../../Routes/routes'
import SideBarItem from '../sideBarItem/SideBarItem'
import { Euro, Home } from '@mui/icons-material'

export default function Sidebar() {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "15vw",
            paddingTop: "10rem",
            padding: "1rem",
            alignItems: "flex-start",
            bgcolor: THEMES.background.white,
            minWidth: "5rem",
            maxWidth: "10rem"
        }} >
            <Box sx={{ width: "auto" }}>
                <Avatar sx={{ width: 100, height: 100 }} src={ExpensesLogo} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <SideBarItem to={ROUTES.HOME} text="home" icon={<Home />} />
                <SideBarItem to={ROUTES.HOME} text="home" icon={<Euro />} />
            </Box>



        </Box>
    )
}
