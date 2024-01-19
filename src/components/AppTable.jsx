import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { getTransactions, getUsers } from '../api/apiService';
import { Pagination, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUserData, setPagesAmount, setUserTransactions, setUsersData } from '../reducers/appReducer';
import { togglePanel } from '../utils';
import Edit from '../img/icons/Edit.svg';
import Trash from '../img/icons/Trash.svg';

const AppTable = ({ searchQuery }) => {
    const dispatch = useDispatch();

    const data = useSelector(state => state.app.usersData);
    const pagesAmount = useSelector(state => state.app.pagesAmount);
    const usersData = useSelector(state => state.app.usersData);

    const tableRef = useGridApiRef();

    const pageSize = Math.floor((window.innerHeight - 420) / 52) - 1;

    useEffect(() => {
        getUsers().then(res => {
            dispatch(setUsersData(res.data.data));
            tableRef.current.setPaginationModel({ pageSize, page: 0 });
            dispatch(setPagesAmount(Math.ceil(res.data.data.length / pageSize)));
        }).catch(err => {
            console.log({ err });
        })
    }, []);

    const filteredData = data.filter(row =>
        row?.email.toLowerCase().includes(searchQuery) ||
        row?.name.toLowerCase().includes(searchQuery) ||
        row?.role.toLowerCase().includes(searchQuery) ||
        row?.subscription?.plan?.type.toLowerCase().includes(searchQuery) ||
        row?.subscription?.plan?.currency.toLowerCase().includes(searchQuery) ||
        row?.subscription?.tokens.toString().includes(searchQuery)
    );

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 600) {
                tableRef.current.setColumnVisibilityModel({
                    role: false,
                    subscription: false,
                    tokens: false,
                    actions: false
                });
            } else {
                tableRef.current.setColumnVisibilityModel({
                    role: true,
                    subscription: true,
                    tokens: true,
                    actions: true
                });
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        dispatch(setPagesAmount(Math.ceil(filteredData.length / pageSize)));
    }, [filteredData.length])

    const showTransactions = (currentRow) => {
        const { row, id } = currentRow;
        getTransactions(id).then(res => {
            dispatch(setUserTransactions(res.data));
            dispatch(setCurrentUserData(row));
            togglePanel(dispatch, true);
        }).catch(err => {
            console.log({ err });
        })
    };

    const onEditClick = (e) => {
        e.stopPropagation();
        console.log('edit')
    }

    const onDeleteClick = (e, id) => {
        e.stopPropagation();
        dispatch(setUsersData(usersData.filter(item => item.id !== id)));
    }

    const columns = [
        {
            field: 'email',
            headerName: 'Email',
            sortable: false,
            flex: 1,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'name',
            headerName: 'Имя',
            sortable: false,
            headerAlign: 'center',
            flex: 1,
            align: 'center'
        },
        {
            field: 'role',
            headerName: 'Роль',
            sortable: false,
            headerAlign: 'center',
            align: 'center',
            flex: 0.5,
            valueGetter: (params) => {
                return params.row.role;
            }
        },
        {
            field: 'subscription',
            headerName: 'Подписка',
            sortable: false,
            headerAlign: 'center',
            align: 'center',
            flex: 0.5,
            valueGetter: (params) => {
                return params.row.subscription.plan.type;
            }
        },
        {
            field: 'tokens',
            headerName: 'Токены',
            type: 'number',
            sortable: true,
            flex: 0.5,
            sortingOrder: ['desc', 'asc'],
            sortComparator: (a, b) => {
                return parseInt(a) - parseInt(b);
            },
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => {
                return params.row.subscription.tokens + ' ' + params.row.subscription.plan.currency;
            }
        },
        {
            field: 'actions',
            headerName: 'Действия',
            sortable: false,
            headerAlign: 'center',
            align: 'center',
            flex: 0.5,
            renderCell: (params) => {
                return <Box>
                    <img onClick={e => onEditClick(e)} src={Edit} alt='edit' />
                    <img style={{ marginLeft: '5px' }} onClick={e => onDeleteClick(e, params.id)} src={Trash} alt='trash' />
                </Box>
            }
        },
    ];

    return (
        <Box sx={{
            width: '100%',
            mt: '20px'
        }}>
            <DataGrid
                sx={{
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: 'black',
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: '1px solid #313E62',
                        cursor: 'pointer'
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
                    border: 'none'
                }}
                rows={filteredData}
                columns={columns}
                onRowClick={row => showTransactions(row)}
                disableColumnMenu={true}
                hideFooterPagination={true}
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'tokens', sort: 'desc' }],
                    }
                }}
                hideFooter={true}
                rowSelection={false}
                apiRef={tableRef}
            />
            <Box sx={{ mt: '10px', display: 'flex', justifyContent: 'center' }}>
                <Stack spacing={2}>
                    <Pagination
                        color='primary'
                        sx={{
                            button: {
                                color: 'white'
                            }
                        }}
                        size='small'
                        count={pagesAmount}
                        onChange={(_, page) => tableRef.current.setPage(page - 1)}
                        shape="rounded" />
                </Stack>
            </Box>
        </Box>
    );
}

export default AppTable;