import { Box, Paper, Typography } from "@mui/material";
import Case from '../img/icons/Case.svg';
import DefaultAvatar from '../img/icons/DefaultAvatar.svg';
import React from "react";

const AppHeader = () => {

    return (
        <Paper sx={{
            background: '#121825',
            height: '82px',
            borderRadius: '17px',
            p: '16px 24px',
            display: 'flex',
            alignItems: 'center'
        }}>
            <Typography sx={{ fontSize: '22px', fontFamily: 'IBM Plex Sans, sans-serif', mr: '10px' }}>BitTest</Typography>
            <Box className="company__wrapper" sx={{ display: 'flex', alignItems: 'center', marginLeft: '60px' }}>
                <Box sx={{
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#222B44',
                    borderRadius: '4px'
                }}>
                    <img src={Case} alt="caseIcon" />
                </Box>
                <Typography sx={{ marginLeft: '10px', fontFamily: 'IBM Plex Sans, sans-serif' }}>Моя организация</Typography>
            </Box>
            <Box className="user__profile" sx={{ width: '178px', p: '10px 12px', border: '1px solid #222B44', display: 'flex', alignItems: 'center', borderRadius: '6px', marginLeft: 'auto' }}>
                <Box>
                    <img src={DefaultAvatar} alt="defaultAvatar" />
                </Box>
                <Box sx={{ marginLeft: '12px' }}>
                    <Typography sx={{ fontSize: '12px', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: '400', lineHeight: '16px', color: '#616D8D' }}>Вы авторизованы</Typography>
                    <Typography sx={{ fontSize: '14px', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: '500', lineHeight: '18px' }}>Администратор</Typography>
                </Box>
            </Box>
        </Paper>
    )
}

export default AppHeader;