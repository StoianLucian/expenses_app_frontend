import { Title } from '@mui/icons-material'
import { Box } from '@mui/material'

export default function HeaderBar() {
    return (
        <Box sx={{
            height: "10vh",
            bgcolor: "#FEFEFE",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingX: "1rem"
        }} >
            <Title>Expenses apps</Title>
            <Box>Stoian Lucian </Box>
        </Box>
    )
}
