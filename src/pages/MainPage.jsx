import { Box } from "@mui/material";
import React from "react";
import AppHeader from "../components/AppHeader";
import AppMain from "../components/AppMain";

const MainPage = () => {

    return (
        <Box sx={{ p: '25px', backgroundColor: '#0E0C15', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppHeader />
            <AppMain />
        </Box>
    )
}

export default MainPage;