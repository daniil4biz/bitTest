import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { formatDate, formatTime } from '../utils';
import { Typography } from '@mui/material';
import { TRANSACTION_TYPE, TRANSACTION_TYPE_TRANSLATION } from '../constants';

const commonFontStyles = {
    fontFamily: "IBM Plex Sans",
    fontSize: '14px',
    fontWeight: 500
};

const AppTransactionsTable = ({ transactions, currency }) => {
    const tableRef = useGridApiRef();
    const pageSize = Math.floor((window.innerHeight - 420) / 52) - 3;

    useEffect(() => {
        tableRef.current.setPaginationModel({ pageSize, page: 0 });
    }, [transactions]);

    const columns = [
        {
            field: 'type',
            headerName: 'Тип',
            sortable: false,
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => {
                return TRANSACTION_TYPE_TRANSLATION[params.row.type];
            }
        },
        {
            field: 'amount',
            headerName: 'Сумма',
            sortable: false,
            headerAlign: 'center',
            flex: 1,
            align: 'center',
            renderCell: (params) => {
                return params.row.type === TRANSACTION_TYPE.REPLENISH
                ?  <Typography sx={{...commonFontStyles, color: '#1ABB34'}}>+{params.row.amount + ' ' + currency}</Typography>
                : <Typography sx={{...commonFontStyles, color: '#FE4242'}}>-{params.row.amount + ' ' + currency}</Typography>
            }
        },
        {
            field: 'created_at',
            headerName: 'Дата',
            sortable: false,
            headerAlign: 'center',
            flex: 1,
            align: 'center',
            renderCell: (params) => {
                return <Typography sx={commonFontStyles}>
                    {formatDate(params.row.created_at)},<br />{formatTime(params.row.created_at)}
                </Typography>;
            }
        }
    ];

    return (
        <Box sx={{
            width: '100%'
        }}>
            <DataGrid
                sx={{
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: 'black',
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: '1px solid #313E62',
                    },
                    '& .MuiDataGrid-main': {
                        fontFamily: 'IBM Plex Sans'
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        border: 'none',
                        backgroundColor: '#0E0C15',
                        borderTopLeftRadius: '8px',
                        borderTopRightRadius: '8px',
                    },
                    ...commonFontStyles,
                    border: 'none'
                }}
                rows={transactions}
                columns={columns}
                disableColumnMenu={true}
                rowSelection={false}
                apiRef={tableRef}
            />
        </Box>
    );
}

export default AppTransactionsTable;