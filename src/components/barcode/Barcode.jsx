import React from "react";
import Barcode from "react-barcode";

//import { makeStyles } from "@material-ui/core";
import { TextField } from "@material-ui/core";

// const useStyles = makeStyles({
//     root: {
//         display: 'block',
//         width: '100%',
//         height: '100vh',
//     },
//     form: {
//         display: 'flex',
//         'flex-direction': 'column',
//         'flex-wrap': 'wrap',
//     },
//     formitem: {
//         width: '60%',
//     },
// })


// const classes = useStyles();
class BarcodeGen extends React.Component {
    constructor () {
        super();
        this.state = {
            locations: ['Lol']
        }
    }


    /*componentDidMount(){
        fetch('http://localhost:3500/locations',{})
        .then(res => res.json())
        .then(res => this.setState({locations: res}));
    }*/

    onChange = (event) => {
        console.log(event.target.value)
        this.setState({locations : [event.target.value]})
    }

    render () {
    return(
        <div  >
            <div >
            <h1 style={{color: 'black'}}>Generat Barcode (Min 12 Numbers (EAN13))</h1>
            <form  noValidate autoComplete="off">
                <TextField
                    id="filled-secondary"
                    label="Generate Barcode"
                    variant="filled"
                    color="primary"
                    onChange={this.onChange}
                />
               
            </form>
        </div>
            {this.state.locations.map(location => (
                <div>
                    <Barcode format={"ean13"}  value={location} />
                </div>
            ))}
        </div>
    )}
};

export default BarcodeGen;