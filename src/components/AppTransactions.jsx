import React, { useEffect, useState } from "react";
import CanvasJSReact from '@canvasjs/react-stockcharts';
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { togglePanel } from "../utils";
import AppTransactionsTable from "./AppTransactionsTable";

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const AppTransactions = () => {
    const dispatch = useDispatch();
    const [dataPoints, setDataPoints] = useState([]);
    const userTransactions = useSelector(state => state.app.userTransactions);
    const currentUserData = useSelector(state => state.app.currentUserData);

    useEffect(() => {
        const dps = userTransactions.map(item => ({
            x: new Date(item.created_at),
            y: Number(item.amount)
        }));
        setDataPoints(dps);
    }, []);

    const options = {
        backgroundColor: "#121825",
        charts: [
            {
                axisX: {
                    crosshair: {
                        enabled: true,
                        snapToDataPoint: true,
                        valueFormatString: "MMM DD YYYY"
                    },
                    labelFontColor: "white",
                    labelFontFamily: "IBM Plex Sans, sans-serif",
                },
                axisY: {
                    crosshair: {
                        enabled: true,
                        snapToDataPoint: true,
                        valueFormatString: "#,###.##"
                    },
                    labelFontColor: "white",
                    labelFontFamily: "IBM Plex Sans, sans-serif",
                },
                data: [
                    {
                        type: "line",
                        color: "#1C64F2",
                        yValueFormatString: "#,###.##",
                        xValueFormatString: "MMM DD YYYY",
                        dataPoints: dataPoints
                    }
                ],

            }
        ],
        rangeSelector: {
            enabled: false
        }
    };

    const containerProps = {
        width: "100%",
        height: "250px",
        margin: "auto",
    };

    const commonFontStyles = {
        fontFamily: "IBM Plex Sans",
        fontSize: '16px',
        fontWeight: 600
    };

    return (
        <Box sx={{ p: '46px 20px 0 20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={commonFontStyles}>
                    {currentUserData.email}
                </Typography>
                <IconButton onClick={() => togglePanel(dispatch, false)}>
                    <ClearIcon />
                </IconButton>
            </Box>
            <Typography sx={{ ...commonFontStyles, mt: '10px' }}>Использование токенов</Typography>
            <Box sx={{ mt: '10px' }}>
                <CanvasJSStockChart
                    containerProps={containerProps}
                    options={options}
                />
            </Box>
            <Typography sx={{ ...commonFontStyles, mt: '20px' }}>
                История операций
            </Typography>
            <Box sx={{ mt: '20px' }}>
                <AppTransactionsTable transactions={userTransactions} currency={currentUserData.subscription.plan.currency} />
            </Box>
        </Box>
    );
};

export default AppTransactions;
