import React from 'react';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";


export default function Scanner(props) {

    const { setBarcode, setScannertoggle } = props;

    return (
        <div>
            <BarcodeScannerComponent
            width={300}
            height={300}
            onUpdate={(err, result) => {
                if (result) {
                setBarcode(result.text)
                setScannertoggle(false)
                } else (console.log('In scanner, if else else ran'))
            }} />
        </div>
    )
}