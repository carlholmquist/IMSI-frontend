import { Grid } from "@material-ui/core";
import { useState } from "react"
import Scanner from "../components/Scanner/scanner.component";

export default function ConsumeItem () {

    const [barcode, setBarcode] = useState();
    const [location, setLocation] = useState();
    const [scannertoggle, setScannertoggle] = useState(true);

    return(
        <div>
            <Grid container>
                <Grid item>
                    <h1>Consume Item</h1>
                    {scannertoggle 
                    ? <Scanner setBarcode={setBarcode} setScannertoggle={setScannertoggle} /> 
                    : <p>scanner not toggled</p> }
                    <p>{barcode}</p>
                </Grid>
                <Grid item>

                </Grid>
            </Grid>
        </div>
    )
}