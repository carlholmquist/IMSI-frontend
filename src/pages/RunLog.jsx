import { MenuItem, TextField, FormControl, InputLabel, Select, makeStyles, Grid, Divider, Button } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { urlPath } from "../functions/helpers";
import { TableBody, TableHead, Table, TableContainer, TableCell, TableRow, Paper } from "@material-ui/core";


const useStyles = makeStyles({
    root: {
        display: 'block',
        width: '100%'
    },
    select: {
        width: '150px'
    },
    jobinfo: {
        display: 'flex',
        'justify-content': 'center',
    },
    jobinfoitems: {
        width: '200px',
        margin: '20px',
    },
    divider: {
        margin: '20px'
    },
    grid: {
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center'
    },
})

export default function RunLog() {
    const [orderlist, setOrderlist] = useState([]);
    const [joborder, setJoborder] = useState({job_order_number: 'Unselected'});
    const [previousruns, setPreviousruns] = useState([]);
    const [run,setRun] = useState({
        total_run_length: 0,
        finished_length: 0
    })

    const classes = useStyles()

    useEffect(()=>{
        fetch(`${urlPath}/joborders`)
        .then(res => res.json())
        .then(data => {
            setOrderlist(data)
        })

        fetch(`${urlPath}/runid`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(joborder)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setPreviousruns(data)
        })

      },[joborder,setPreviousruns,run]);

    const handleChange = (e) => {
        const newArr = orderlist.filter((order) => order.job_order_number === e.target.value)
        setJoborder(newArr[0])
    }

    const handleQuantity = (e,name) => {
        setRun({
            ...run,
            [`${name}`]: e.target.value
        })
        console.log(run)
    }

    const handleSubmit = () => {
        const newrun = {
            machine_id: 1,
            job_order_id: joborder.job_order_id,
            total_run_length: run.total_run_length,
            finished_length: run.finished_length
        }
        console.log(newrun)
        fetch(`${urlPath}/addrun`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newrun)
        })
        .then(res => res.json())
        .then(data => {
            console.log('handleSubmit retur: ',data);
            setRun({
                total_run_length: 0,
                finished_length: 0
            });
        })
    }

    return(
        <div className={classes.root}>
            <div className={classes.select}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Job Order</InputLabel>
                    <Select
                        
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={joborder.job_order_number}
                        label="Job Order"
                        onChange={handleChange}
                    >
                        {orderlist.map((order)=>{
                            return <MenuItem value={order.job_order_number}> {order.job_order_number} </MenuItem>
                        })}
                    </Select>
                </FormControl>
            </div>
            <Divider className={classes.divider}/>
            
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow className={classes.tablecell}>
                            <TableCell align="right">Job Order Number</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Ordered Quantity</TableCell>
                            <TableCell align="right">Gross Footage</TableCell>
                            <TableCell align="right">Run Length (Feet)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key={1}>
                            <TableCell align="right">{joborder.job_order_number}</TableCell>
                            <TableCell align="right">{joborder.sku_name}</TableCell>
                            <TableCell align="right">{joborder.order_quantity_label}</TableCell>
                            <TableCell align="right">{joborder.total_run_length}</TableCell>
                            <TableCell align="right">{joborder.run_length}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Divider/>
                    
            <h2> Previous Runs</h2>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow key={run.run_id}>
                            <TableCell align="right">Run number: </TableCell>
                            <TableCell align="right">Finished Run Length</TableCell>
                            <TableCell align="right">Gross Run Length</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                    {previousruns.map((run,i) => (
                        <TableRow key={run.run_id}>
                            <TableCell align="right">{i+1}</TableCell>
                            <TableCell align="right">{run.finished_length}</TableCell>
                            <TableCell align="right">{run.total_run_length}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            <Divider className={classes.divider}/>
            <Grid container className={classes.grid}>
                <form  noValidate autoComplete="off">
                    <TextField
                        className={classes.textfield}
                        id="Search"
                        label="Total quantity"
                        variant="outlined"
                        color="primary"
                        value={run.total_run_length}
                        onChange={(event) => handleQuantity(event,'total_run_length')}
                    />
                    <TextField
                        className={classes.textfield}
                        label="Finished quantity"
                        variant="outlined"
                        color="primary"
                        value={run.finished_length}
                        onChange={(event) => handleQuantity(event,'finished_length')}
                    />
                    <Button
                        className={classes.button}
                        variant="outlined"
                        onClick={handleSubmit}
                    >
                        Submit Run
                    </Button>
                </form>
            </Grid>
        </div>    )
}