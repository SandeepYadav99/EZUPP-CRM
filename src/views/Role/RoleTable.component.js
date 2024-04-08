/**
 * Created by charnjeetelectrovese@gmail.com on 4/27/2020.
 */
import React, {Component} from 'react';
import {
    Table,
    TableBody, TableCell,
    TableRow,
    Checkbox,
    Typography
} from '@mui/material';
import {withStyles} from '@mui/styles';
import styles from './Style.module.css';
import ShadowBox from '../../components/ShadowBox/ShadowBox';
import { Info, InfoOutlined } from '@mui/icons-material';

const RoleTableComponent = ({ classes, data }) => {
    const renderRows = (rowData) => {
        return (
            <TableRow>
                <TableCell classes={{ root: classes.tableCell }}>Modules</TableCell>
                <TableCell classes={{ root: classes.tableCell }}>
                    <div className={styles.crud}><Checkbox color={'primary'} /> All Data</div>
                </TableCell>
                <TableCell classes={{ root: classes.tableCell }}>
                    <div className={styles.crud}><Checkbox color={'primary'} />Read</div>
                </TableCell>
                <TableCell classes={{ root: classes.tableCell }}>
                    <div className={styles.crud}><Checkbox color={'primary'} />Write</div>
                </TableCell>
                <TableCell classes={{ root: classes.tableCell }}>
                    <div className={styles.crud}><Checkbox color={'primary'} />Update</div>
                </TableCell>
                <TableCell classes={{ root: classes.tableCell }}>
                    <div className={styles.crud}><Checkbox color={'primary'} />Delete</div>
                </TableCell>
                <hr/>
            </TableRow>
        );
    };

    return (
        <ShadowBox width={"100%"}>
            <div className={styles.infoFiled}>
            <Typography variant="h5">Permissions Granted </Typography>
            <InfoOutlined/>
            </div>
            <Table className={classes.table} aria-label="simple table">
                <TableBody>
                    {renderRows(data)}
                    {/* <TableRow>
                        <TableCell>Customer</TableCell>
                        <TableCell classes={{ root: classes.singleCell }}><Checkbox color={'primary'} /></TableCell>
                        <TableCell classes={{ root: classes.singleCell }}><Checkbox color={'primary'} /></TableCell>
                        <TableCell classes={{ root: classes.singleCell }}><Checkbox color={'primary'} /></TableCell>
                        <TableCell classes={{ root: classes.singleCell }}><Checkbox color={'primary'} /></TableCell>
                    </TableRow> */}
                </TableBody>
            </Table>
        </ShadowBox>
    );
};

const useStyle = (theme) => ({
    tableCell: {
        color: 'black',
        fontSize: '0.90rem',
        textTransform: 'capitalize',
    },
    cardHeader: {
        padding: '10px'
    },
    singleCell: {
        textAlign: 'center'
    }
});

export default withStyles(useStyle, { withTheme: true })(RoleTableComponent);