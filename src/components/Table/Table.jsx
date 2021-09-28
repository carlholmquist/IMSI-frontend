// Import Packages
import React from 'react';
import { Link } from 'react-router-dom';

// Import Components
import { 
  Button, 
  Table, 
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper 
} from '@material-ui/core';

// Import Style hook
import { makeStyles } from '@material-ui/core/styles';

// Declare Styles
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






export default function ProductTable(props) {
  const classes = useStyles();

  // Destructure variables from props
  const {rowHeaders, products} = props;

  // Create  
  function handler(product) {
    const newTo = {
      pathname: '/receiving',
      product: product,
    }
    return newTo
  }

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
                <Link to={handler(row)} onClick={()=>console.log('click link')}>
                  <Button variant="outlined" onClick={()=> console.log('click')} style={{backgroundColor: '#12824C', color: '#FFFFFF'}} size="small">
                    Product Page
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}