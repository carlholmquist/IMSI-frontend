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

function Scanner() {
 
  const [ data, setData ] = React.useState('Not Found');
  const classes = useStyles();
 
  return (
    <div>
      <h1 className={classes.root} >Scan a barcode</h1>
      { data==='Not Found' ?
        <BarcodeScannerComponent
          className={classes.video}
          width={300}
          height={300}
          onUpdate={(err, result) => {
            if (result) setData(result.text)
            else setData('Not Found')
        }}
      /> : <h1>Hey</h1>
      }
      
      <p className={classes.root} >{data}</p>
    </div>
  )
}
 
export default Scanner;