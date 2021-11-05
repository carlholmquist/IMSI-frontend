import React from "react";
import { useState, useEffect } from "react";

import { barcodeGen, urlPath } from "../../functions/helpers";
import Barcode from "react-barcode";

import { Grid, TextField, makeStyles } from "@material-ui/core";
import { 
    Button, 
    Table, 
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper 
  } from '@material-ui/core';

const useStyles = makeStyles({
    secondaryRoot: {
        display: 'grid',
    },
    secondaryLeft: {
        'border-style': 'dotted',
    }
})


export default function ProductInfo(props) {

    const { product } = props;
    const classes = useStyles();
    const [quantity, setQuantity] = useState();
    const [barcode, setBarcode] = useState(barcodeGen(8));
    const [form,setForm] = useState({
        quantity_received: '',
        inventory_location: '',
    });
    const [item, setItem] = useState([{product_item_barcode:'No items in Inventory'}]);
    console.log(product);

    // Figure out how to persist state between reloads
    // console.log(JSON.parse(window.localStorage.getItem('item')));
    

    useEffect(() => {
        fetch(`${urlPath}/quantity`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(product)
        })
        .then(res => res.json())
        .then(data => {
            setItem(data)
            setQuantity(data.reduce((acc,val)=> acc+val.product_item_quantity ,0))
        })

        console.log('useEffect running');
    },[barcode,setItem, setQuantity,product])

    function handleSubmit(event) {
        event.preventDefault();
        console.log('handleSubmit run');
        const addProduct = {
            ...form,
            barcode: barcode,
            product_id: product.product_id,
        }

        fetch(`${urlPath}/addproduct`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(addProduct)
        })
        .then(res => res.json())
        .then(data => {
            setBarcode(barcodeGen(8));
            console.log('handleSubmit retur: ',data);
        })
    }

    return(
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <div className={classes.secondaryLeft}>
                    <div>
                        <p>Currently in inventory: {quantity} {product.product_unit}</p>
                    </div>
                    <div>
                        <h1>Add received product to inventory</h1>
                        <h2>Received quantity</h2>
                        <form onSubmit={handleSubmit} noValidate autoComplete="off">
                            <TextField
                                id="Search"
                                label="Quantity Received"
                                variant="filled"
                                color="primary"
                                onChange={(e)=>setForm({...form, quantity_received: e.target.value})}
                                value={form.quantity_received}
                            />
                            <TextField
                                id="location"
                                label="Inventory Location"
                                variant="filled"
                                color="primary"
                                onChange={(e)=>setForm({...form, inventory_location: e.target.value})}
                                value={form.inventory_location}
                            />
                            <Button type='submit' variant="outlined" style={{backgroundColor: '#12824C', color: '#FFFFFF'}} size="small">
                                    Add
                            </Button>
                        </form>
                        <Barcode 
                            // format={"ean8"}  
                            value={barcode} />
                        <p>barcode {barcode}</p>
                    </div>
                </div>
            </Grid>
            <Grid item xs={8}>
                <TableContainer component={Paper}>
                    <Table  size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left"> Barcode ID</TableCell>
                                <TableCell align="left"> Item Location</TableCell>
                                <TableCell align="left"> Item Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {item.map(item => (
                                <TableRow key={item.product_item_barcode}>
                                    <TableCell component="th" scope="product">{item.product_item_barcode}</TableCell>
                                    <TableCell align="left">{item.location_id}</TableCell>
                                    <TableCell align="left">{item.product_item_quantity}</TableCell>
                                </TableRow>

                            ))}
                            <TableRow key={'total_row'}>
                                    <TableCell component="th" scope="product">Total:</TableCell>
                                    <TableCell align="left">{item.length}</TableCell>
                                    <TableCell align="left">{quantity}</TableCell>
                            </TableRow>


                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}