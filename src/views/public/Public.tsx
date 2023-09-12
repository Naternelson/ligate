import { Box } from "@mui/material"
import NavBar from "../../components/NavBar"
import { Outlet } from "react-router-dom"

const PublicLayout = () => {
    return (
        <Box>
            <NavBar/>
            <Outlet/>
        </Box>
    )
}

export default PublicLayout