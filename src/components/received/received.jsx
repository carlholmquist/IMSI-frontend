import React from 'react';
import { useLocation } from 'react-router';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Divider } from '@material-ui/core';
import ProductInfo from '../ProductInfo/ProductInfo';

export default function Received(props) {
    const location = useLocation();
    const { product } = location;

    return(
    <div>
        <TableContainer component={Paper}>
        <Table  size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell align="right"> product_category</TableCell>
                    <TableCell align="right"> inventory_id</TableCell>
                    <TableCell align="right"> supplier_id</TableCell>
                    <TableCell align="right"> product_name</TableCell>
                    <TableCell align="right"> product_min_limit</TableCell>
                    <TableCell align="right"> product_reorder_size</TableCell>
                    <TableCell align="right"> product_unit</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow key={'lol'}>
                    <TableCell component="th" scope="product">{product.product_category}</TableCell>
                    <TableCell align="right">{product.inventory_id}</TableCell>
                    <TableCell align="right">{product.supplier_id}</TableCell>
                    <TableCell align="right">{product.product_name}</TableCell>
                    <TableCell align="right">{product.product_min_limit}</TableCell>
                    <TableCell align="right">{product.product_reorder_size}</TableCell>
                    <TableCell align="right">{product.product_unit}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
        </TableContainer>
        <br/>
        <Divider />
        <br/>
        <ProductInfo 
            product={product}
        />
    </div>
    );
}