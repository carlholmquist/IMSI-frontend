import React, { useState} from "react";

import { makeStyles, TextField } from "@material-ui/core";

export default function AddProduct() {

    const [product,setProduct] = useState();

    const useStyles = makeStyles({
        root: {

        }
    })

    return(
        <form>
            <TextField id="standard-basic" label="Category" />
            <TextField id="standard-basic" label="Inventory Id" />
            <TextField id="standard-basic" label="Supplier" />
            <TextField id="standard-basic" label="Name" />
            <TextField id="standard-basic" label="Min limit" />
            <TextField id="standard-basic" label="Reorder Size" />
            <TextField id="standard-basic" label="Unit" />
        </form>
    )
}