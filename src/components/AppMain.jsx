import { Box, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import SearchCircle from '../img/icons/SearchCircle.svg';
import React, { useState } from "react";
import AppTable from "./AppTable";

const AppMain = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const onSearchQuery = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    }

    return (
        <Paper sx={{
            flex: 1,
            mt: '30px',
            background: '#121825',
            height: '82px',
            borderRadius: '17px',
            p: '16px 0'
        }}>
            <Typography sx={{
                fontSize: '22px',
                fontFamily: 'IBM Plex Sans',
                fontWeight: '600',
                p: '0 24px 15px 24px',
                borderBottom: '1px solid #222B44'
            }}>Моя организация</Typography>
            <Box>
                <Typography sx={{
                    fontSize: '22px',
                    fontFamily: 'IBM Plex Sans',
                    fontWeight: '600',
                    p: '0 24px',
                    mt: '30px'
                }}>Пользователи</Typography>
                <Box sx={{ p: '0 24px' }}>
                    <TextField
                        sx={{
                            mt: '24px',
                            border: '1px solid #313E62',
                            display: 'block',
                            borderRadius: '8px'
                        }}
                        value={searchQuery}
                        onChange={e => onSearchQuery(e)}
                        inputProps={{
                            style: {
                                height: '15px',
                                color: '#616D8D',
                                fontFamily: 'IBM Plex Sans'
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <img src={SearchCircle} alt="searchCircle" />
                                </InputAdornment>
                            )
                        }}
                        placeholder="Поиск"
                        fullWidth />
                </Box>
                <Box sx={{ p: '0 24px' }}>
                    <AppTable searchQuery={searchQuery} />
                </Box>
            </Box>
        </Paper>
    )
}

export default AppMain;