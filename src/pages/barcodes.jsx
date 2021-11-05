import React, { useRef } from "react";

import { makeStyles } from "@material-ui/core";
import {useReactToPrint} from "react-to-print";
import BarcodeGen from "../components/Barcode/Barcode";

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


export default function BarcodePrint() {
    const classes = useStyles();
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return(
        <div className={classes.root} >
            <BarcodeGen className={classes.form} compRef={componentRef} />
            <button className={classes.form} onClick={(event) => {handlePrint(event); console.log('test');}}>Print this out!</button>
        </div>
    )
}