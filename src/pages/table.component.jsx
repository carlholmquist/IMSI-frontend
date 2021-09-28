import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { urlPath } from '../functions/helpers';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '100%',
  },
  table: {
    minWidth: '650',
  },
  tablecell: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    width: '100hv',
  },
  title: {
    display: 'block',
  }
});



export default function DenseTable() {
  const classes = useStyles();

  React.useEffect(()=>{
    fetch(`${urlPath}/products`, {
          })
  .then(res => res.json())
  .then(data => {
    setProducts(data);
  })
  },[]);

  const [products, setProducts] = useState([]);

  return (
    <div className={classes.root}>
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow className={classes.tablecell}>
            <TableCell>Category</TableCell>
            <TableCell align="right">DWS INV ID</TableCell>
            <TableCell align="right">Supplier</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Min Lim</TableCell>
            <TableCell align="right">Reorder Size</TableCell>
            <TableCell align="right">Unit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => (
            <TableRow key={row.product_id}>
              <TableCell component="th" scope="row">
                {row.product_category}
              </TableCell>
              <TableCell align="right">{row.inventory_id}</TableCell>
              <TableCell align="right">{row.supplier_id}</TableCell>
              <TableCell align="right">{row.product_name}</TableCell>
              <TableCell align="right">{row.product_min_limit}</TableCell>
              <TableCell align="right">{row.product_reorder_size}</TableCell>
              <TableCell align="right">{row.product_unit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}