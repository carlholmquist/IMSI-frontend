import React, { useEffect, useState,} from "react";
import Barcode from "react-barcode";

import { makeStyles } from "@material-ui/core";

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

const number = 1233542353453;

export default function BarcodeGen() {
    const classes = useStyles();
    

    return(
        <div className={classes.form} >
            <Barcode className={classes.form} value={number} />
        </div>
    )
}