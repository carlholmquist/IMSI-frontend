import React from 'react';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { makeStyles } from '@material-ui/core';
 
const useStyles = makeStyles({
    root : {
        color: 'black',
    },
    video: {
        'object-fit': 'contain',
    }
})

function Scanner(props) {
  const {setSearch, scannertoggle, setScannertoggle, onSubmit} = props;
  const classes = useStyles();
 
  return (
    <div>
      <form onSubmit={onSubmit}>
      
        <BarcodeScannerComponent
          className={classes.video}
          width={300}
          height={300}
          onUpdate={(err, result) => {
            if (result) {
              setSearch(result.text)
              setScannertoggle(!scannertoggle)
            } else (console.log('In scanner, if else else ran'))
        }} />
      </form>
    </div>
  )
}
 
export default Scanner;