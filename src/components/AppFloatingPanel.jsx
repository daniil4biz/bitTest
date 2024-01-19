import { Box } from "@mui/material";
import React from "react";
import AppTransactions from "./AppTransactions";

const AppFloatingPanel = () => {

    return (
        <Box sx={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
        }}>
            <Box sx={{
                height: '100vh',
                maxWidth: '470px',
                backgroundColor: '#121825',
                marginLeft: 'auto'
            }}>
                <AppTransactions />
            </Box>
        </Box>
    )
}

export default AppFloatingPanel;