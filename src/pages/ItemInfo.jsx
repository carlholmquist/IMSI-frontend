import { Button, Grid, TextField } from "@material-ui/core";
import { useState } from "react";
import Scanner from "./scanner";
import { urlPath } from "../functions/helpers";


export default function ItemInfo () {
    const [item,setItem] = useState({
        product_name: 'No item selected',
        location_id: '',
        product_item_quantity: '',
        product_item_barcode: ''
    });
    const [move,setMove] = useState();
    const [search,setSearch] = useState();
    const [location,setLocation] = useState();
    const [scannertoggle,setScannertoggle] = useState(false);
    const [scannertoggleMOVE,setScannertoggleMOVE] = useState(false);

    function handleSubmit (e) {
        console.log('Handle submit run')
        e.preventDefault();
        console.log('What is search inside handle submit ', search);
        const itemdata = {search: search}

        fetch(`${urlPath}/iteminfo`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(itemdata)
        })
        .then(res => res.json())
        .then(data => {
            console.log('handleSubmit Return: ',data);
            setItem(data[0]);
        })

    }

    function handleMove (e) {
        e.preventDefault();
        
        const updatedItem = {
            ...item,
            location_id: location
        }
        console.log('Move to: ', updatedItem);

        fetch(`${urlPath}/moveitem`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedItem)
        })
        .then(res => res.json())
        .then(data => {
            console.log('handleSubmit Return: ',data);
            if (data === 1) {
                setItem({...item,location_id:location});
            } else (console.log('Something went wrong'));
        })
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <Button 
                        variant="outlined" 
                        onClick={(e) => setScannertoggle(!scannertoggle)}
                        style={{backgroundColor: '#12824C', color: '#FFFFFF'}} 
                        size="small">
                            Scanner
                    </Button>
                    {scannertoggle ? 
                    <Scanner 
                        setSearch={setSearch} 
                        scannertoggle={scannertoggle} 
                        search={search}  
                        setScannertoggle={setScannertoggle}
                        onSubmit={handleSubmit}
                        type='submit'
                        /> :
                    <TextField
                        id="Search"
                        label="Scan barcode"
                        variant="filled"
                        color="primary"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        /> 
                    }
                    
                    <Button 
                        type='submit' 
                        variant="outlined" 
                        style={{backgroundColor: '#12824C', color: '#FFFFFF'}} 
                        size="small">
                            Submit
                    </Button>
                </form>
            </div>
            <div>
                <h2>Item info</h2>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <p>Product name: {item.product_name} </p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>Location: {item.location_id}</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>Quantity: {item.product_item_quantity}</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>Barcode: {item.product_item_barcode}</p>
                    </Grid>
                </Grid>
            </div>
            <form onSubmit={handleMove}>
                <Button 
                    type='submit'
                    variant="outlined" 
                    style={{backgroundColor: '#12824C', color: '#FFFFFF'}} 
                    size="small">
                        Move to
                </Button>
                {scannertoggleMOVE ?
                <Scanner 
                        setSearch={setLocation} 
                        scannertoggle={scannertoggleMOVE} 
                        search={location}  
                        setScannertoggle={setScannertoggleMOVE}
                        onSubmit={handleMove}
                        type='submit'
                        />
                 :
                <TextField
                    id="Search"
                    label="Scan location barcode"
                    variant="filled"
                    color="primary"
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                /> }
                <Button 
                        variant="outlined" 
                        onClick={(e) => setScannertoggleMOVE(!scannertoggleMOVE)}
                        style={{backgroundColor: '#12824C', color: '#FFFFFF'}} 
                        size="small">
                            Scanner
                </Button>
                
                    
            </form>

        </div>
    )
}