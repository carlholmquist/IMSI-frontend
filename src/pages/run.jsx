import React, { useEffect, useState} from "react";

import { makeStyles, TextField } from "@material-ui/core";


const useStyles = makeStyles({
    root: {
        display: 'block',
        width: '100%',
        height: '100vh',
    },
    form: {
        display: 'flex',
        'flex-direction': 'column',
        'flex-wrap': 'wrap',
    },
    formitem: {
        width: '60%',
    },
})

export default function AddProduct() {
    

    useEffect(()=>{
        fetch('http://localhost:3500/categorys', {
              })
      .then(res => res.json())
      .then(data => {
        setCategorys(data);
        console.log(data);
      })
      },[]);

    const [product,setProduct] = useState({
        product_category: '',
    });
    const [categorys,setCategorys] = useState([{category_name: 'Choose Category'}])
    const classes = useStyles();

    const handleChange = (event) => {
        console.log(event.target.value)
        console.log(product);
        const data = product;
        setProduct({
            ...data,
            product_category: event.target.value,
        })
    }

    return(
        <div className={classes.root}>
            <h1>Add Products</h1>
            <form className={classes.form} noValidate autoComplete="off">
                <TextField
                    className={classes.formitem}
                    id="standard-select-currency-native"
                    select
                    label="Category"
                    value={product.product_category}
                    onChange={handleChange}
                    SelectProps={{
                        native: true,
                    }}
                    helperText="Please select category"
                    >
                    {categorys.map((category) => (
                        <option key={category.category_id} value={category.category_name}>
                            {category.category_name}
                        </option>
                    ))}
                </TextField>
                <TextField
                    className={classes.formitem}
                    id="filled-secondary"
                    label="Filled secondary"
                    variant="filled"
                    color="secondary"
                />
                <TextField
                    className={classes.formitem}
                    id="outlined-secondary"
                    label="Outlined secondary"
                    variant="outlined"
                    color="secondary"
                />
                <TextField 
                    className={classes.formitem}
                    id="standard-secondary" 
                    label="Standard secondary" 
                    color="secondary" />
                <TextField
                    className={classes.formitem}
                    id="filled-secondary"
                    label="Filled secondary"
                    variant="filled"
                    color="secondary"
                />
                <TextField
                    className={classes.formitem}
                    id="outlined-secondary"
                    label="Outlined secondary"
                    variant="outlined"
                    color="secondary"
                />
            </form>
        </div>
    )
}