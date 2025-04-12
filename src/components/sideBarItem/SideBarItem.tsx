import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'

type SideBarItemProps = {
    text: string
    to: string
    icon: JSX.Element
}

export default function SideBarItem({ text, to, icon }: SideBarItemProps) {
    return (
        <Link to={to}>
            <Button
                variant="text"
            >
                <Box sx={{ marginRight: "10px" }}>{icon}</Box>
                {text}
            </Button>
        </Link>
    )
}
