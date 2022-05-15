import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import agent from "../../app/api/agent";
import Loading from "../../app/layout/Loading";
import { Basket } from "../../app/models/Basket";
import { useStoreContext } from "../../context/StoreContext";
import BasketSummary from "./BasketSummary";

export default function BasketPage(){
    // const [loading, setLoading] = useState(true);
    // const [basket, setBasket] = useState<Basket | null>(null);
    const {basket, setBasket, removeItem} = useStoreContext();
    const [status, setStatus] = useState({
      loading: false,
      name: ''
    });

    function handleAddItem(productId: number, name: string){
      setStatus({loading: true, name});
      agent.Basket.addItem(productId)
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setStatus({loading: false, name: ''}))
    }

    function handleRemoveItem(productId: number, quantity = 1, name: string){
      setStatus({loading: true, name});
      agent.Basket.removeItem(productId, quantity)
        .then(() => removeItem(productId, quantity))
        .catch(error => console.log(error))
        .finally(() => setStatus({loading: true, name: ''}))
    }

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // useEffect(() => {
    //     agent.Basket.get()
    //         .then(basket => setBasket(basket))
    //         .catch(error => console.log(error))
    //         .finally(() => setLoading(false))
    // }, [])

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // if(loading) return <Loading message="Loading basket..." />

    if(!basket) return <Typography variant="h3">Your basket is empty</Typography>

    interface Column {
        id: 'name' | 'code' | 'population' | 'size' | 'density';
        label: string;
        minWidth?: number;
        align?: 'right';
        format?: (value: number) => string;
      }

    return(
      <>
        <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            {/* <TableRow>
              <TableCell align="center" colSpan={2}>
                Country
              </TableCell>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
            </TableRow> */}
            <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="right">Subtotal</TableCell>
                <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => {
                return (
                    <TableRow
                    key={item.productId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        <Box display='flex' alignItems='center'>
                            <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20 }} />
                            <span>{item.name}</span>
                        </Box>
                    </TableCell>
                    <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
                    <TableCell align="center">
                        
                            <LoadingButton 
                                loading={status.loading && status.name === 'remove' + item.productId} 
                                onClick={() => handleRemoveItem(item.productId,1,'remove' + item.productId)}
                                color='error'
                            >
                                <Remove />
                            </LoadingButton>
                            {item.quantity}
                            <LoadingButton 
                                loading={status.loading && status.name === 'add' + item.productId} 
                                onClick={() => handleAddItem(item.productId,'add' + item.productId)}
                                color='secondary'
                            >
                                <Add />
                            </LoadingButton>
                    </TableCell>
                    <TableCell align="right">${((item.price / 100) * item.quantity).toFixed(2)}</TableCell>
                   
                        <TableCell align="right">
                            <LoadingButton 
                                loading={status.loading && status.name === 'delete' + item.productId} 
                                onClick={() => handleRemoveItem(item.productId, item.quantity, 'delete' + item.productId)}
                                color='error'
                            >
                                <Delete />
                            </LoadingButton>
                        </TableCell>
                </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={basket.items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
              <BasketSummary />
              <Button
                component={NavLink}
                to={"/checkout"}
                variant='contained'
                size="large"
                fullWidth
              >
                Checkout
              </Button>
        </Grid>
    </Grid>

      </>
      
    )
}