import React, { useEffect, useState} from "react";

import { Grid, makeStyles, TextField } from "@material-ui/core";

import ProductTable from "../components/Table/Table";


const useStyles = makeStyles({
    root: {
        display: 'block',
        width: '100%',
        height: '100vh',
        color: 'black'
    },
    form: {
        display: 'flex',
        'flex-direction': 'column',
        'flex-wrap': 'wrap',
        width: '100%'
        
    },
    formitem: {
        width: '30%',
        'alignContent': 'center',
    },
    grid: {
        display: 'block',
        height: '100%'
    },
    table: {
        display: 'block',
        height: '400px',
    }
})

const rowHeaders = ['product_category','DWS INV ID','Supplier','Name','Min Lim','Reorder Size','Unit']

export default function Products() {
    
    //Initiate state for products to determine what is being received
    const [product,setProduct] = useState([{
        'product_category': '',
        'inventory_id': '',
        'supplier_id': '',
        'product_name': 'TEST',
        'product_min_limit': '',
        'product_reorder_size': '',
        'product_unit': ''}]);
    
    // Initiate state for our search, enabling searching for products
    const [search,setSearch] = useState('');

    // Fetching product data from back end
    useEffect(()=>{
      fetch('http://localhost:3500/products')
      .then(res => res.json())
      .then(data => {
        setProduct(data);
      })
      },[]);
    
    // Filter back end product data based on search criteria
    const filteredProducts = product.filter((product) => {
        if (search==='') {
            return product.product_name
        } else {
            return product.product_name.includes(search)
        }
    })

    const classes = useStyles();

    // Update our search state
    const handleChange = (event) => {
        setSearch(event.target.value);
    }

    return(
        <div className={classes.root}>
            <Grid className={classes.grid}>
                <h1>Search for recieved product</h1>
                <form  noValidate autoComplete="off">
                    <TextField
                        className={classes.formitem}
                        id="Search"
                        label="Search Product"
                        variant="filled"
                        color="primary"
                        onChange={handleChange}
                    />
                </form>
                <ProductTable 
                    rowHeaders={rowHeaders}
                    products={filteredProducts} 
                    className={classes.table}
                />
            </Grid>
        </div>
    )
}