import React, {Component} from 'react';
import {withStyles} from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Constants from '../../config/constants';
const useStyles = {
    table: {
        minWidth: 450,
    },
};


class TableTask extends Component {
    ccyFormat(num) {
        return `${Constants.CURRENCY} ${num.toFixed(2)}`;
    }

    render(){
        const {handleSubmit,classes, amount} = this.props;
        return (
            <TableContainer component={Paper} >
                <Table className={classes.table} aria-label="spanning table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={2}>
                                Details
                            </TableCell>
                            <TableCell align="right">Price</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            {/*<TableCell align="right">Qty.</TableCell>*/}
                            <TableCell align="right">Quantity - Price</TableCell>
                            <TableCell align="right">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.data.map((row) => (
                            <TableRow key={row.desc}>
                                <TableCell>{row.name}</TableCell>
                                {/*<TableCell align="right">{row.qty}</TableCell>*/}
                                <TableCell align="right">{row.quantity} X {parseFloat(row.price) } /-</TableCell>
                                <TableCell align="right">{this.ccyFormat(parseFloat(row.quantity) * parseFloat(row.price))}</TableCell>
                            </TableRow>
                        ))}

                        <TableRow>
                            <TableCell rowSpan={4} />
                            <TableCell >Subtotal</TableCell>
                            <TableCell align="right">{this.ccyFormat(amount.subtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Discount</TableCell>
                            <TableCell align="right">{this.ccyFormat(amount.discount)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Delivery Charges</TableCell>
                            <TableCell align="right">{this.ccyFormat(amount.delivery_charges)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell >Total</TableCell>
                            <TableCell align="right">{this.ccyFormat(amount.total)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

export default withStyles(useStyles)(TableTask)
