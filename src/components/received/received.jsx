import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';

import { barcodeGen } from '../../functions/helpers';
import Barcode from 'react-barcode';


export default function Received(props) {
    const location = useLocation();
    const { product } = location;
   
    
    const [quantity, setQuantity] = useState();
    const [barcode, setBarcode] = useState(barcodeGen(8));

    useEffect(()=>{
        fetch('http://localhost:3500/quantity', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(product)
        })
        .then(res => res.json())
        .then(data => {
            setQuantity(prevState => (data));
            setBarcode(barcodeGen(8));
        })
        
    },[product]);

    // function handleAddProduct() {
    //     fetch('http://localhost:3500/addproduct', {
    //         method: 'post',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify(product)
    //     })
    //   .then(res => res.json())
    //   .then(data => {
    //       console.log(data);
    //     setQuantity(prevState => (data));
    //     console.log('1');
    //   })  
    // }
    


    return(
    <div>
        <TableContainer component={Paper}>
        <Table  size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell> product_category</TableCell>
                    <TableCell> inventory_id</TableCell>
                    <TableCell> supplier_id</TableCell>
                    <TableCell> product_name</TableCell>
                    <TableCell> product_min_limit</TableCell>
                    <TableCell> product_reorder_size</TableCell>
                    <TableCell> product_unit</TableCell>
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
        <div>
            <p>Currently in inventory: {quantity} {product.product_unit}</p>
        </div>
        <div>
            <h1>Add received product to inventory</h1>
            <h2>Received quantity</h2>
            <form  noValidate autoComplete="off">
                <TextField
                    id="Search"
                    label="Quantity Received"
                    variant="filled"
                    color="primary"
                />
            </form>
            <Button variant="outlined" onClick={()=> console.log('click')} style={{backgroundColor: '#12824C', color: '#FFFFFF'}} size="small">
                    Add
            </Button>
            <Barcode format={"ean8"}  value={barcode} />
            <p>barcode {barcode}</p>
        </div>
    </div>
    );
}