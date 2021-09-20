import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'block',
    width: '100%',
    height: '50vh',
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



export default function Table2(props) {
  const classes = useStyles();

  const {rowHeaders, products} = props;
  console.log(props,"TESTING");
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow className={classes.tablecell}>
          {rowHeaders.map(rowHeader => (
            <TableCell>{rowHeader}</TableCell>
          ))}
          <TableCell> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products===0 ? <h1>LOL</h1> :
          products.map((row) => (
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
              <TableCell> 
                <Button variant="outlined" style={{backgroundColor: '#12824C', color: '#FFFFFF'}} size="small">
                  Add
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}