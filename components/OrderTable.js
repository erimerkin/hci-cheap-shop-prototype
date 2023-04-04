import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, TextField } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

// function ccyFormat(num) {
//     return `${num.toFixed(2)}`;
// }

function priceRow(qty, unit) {
    return qty * unit;
}


function subtotal(items) {
}


export default function SpanningTable({addedProducts, updateAmount, deleteAction}) {

    const [products, setProducts] = React.useState([]);
    const [totalPrice, setTotalPrice] = React.useState(0);

    React.useEffect(() => {
        setProducts(addedProducts);
    }, [addedProducts]);


    React.useEffect(() => {
        setTotalPrice(
            products.reduce((sum, { amount, price }) => sum + priceRow(amount, price), 0)
        );
    }, [totalPrice, products]);


    return (
        <TableContainer sx={{ width: '100%', elevation: '0', border:1, borderColor: 'divider', borderRadius: '8px'}}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Item ID</strong></TableCell>
                        <TableCell align="right"><strong>Quantity</strong></TableCell>
                        <TableCell align="right"><strong>Unit Price</strong></TableCell>
                        <TableCell align="right"><strong>Price</strong></TableCell>
                        <TableCell align="right"/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {addedProducts.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell align="right">
                                <TextField
                                    id="outlined-number"
                                    value={row.amount}
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx = {{
                                        width: '100px'
                                    }}
                                    onChange={(e) => {
                                        let newAmount = e.target.value;
                                        if (newAmount <= 0) {
                                            deleteAction(row.id);
                                        } else {
                                            updateAmount(row.id, newAmount);
                                        }
                                    }}
                                    /> </TableCell>
                            <TableCell align="right">${row.price}</TableCell>
                            <TableCell align="right">${row.totalPrice}</TableCell>
                            <TableCell align="right"><IconButton color="error" onClick={() => deleteAction(row.id)}><DeleteIcon/></IconButton> </TableCell>
                        </TableRow>
                    ))}

                    <TableRow>
                        <TableCell colSpan={3} align="right"><strong>Total</strong></TableCell>
                        <TableCell align="right">${totalPrice}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}