// Package Imports
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

//Component Imports
import DenseTable from './pages/table.component';
import ButtonAppBar from './components/relative_action_bar/action_bar';
import Scanner from "./pages/scanner";
import TemporaryDrawer from "./components/drawer/temporarydrawer";

//Page Imports
import Addproduct from "./pages/Products";
import BarcodePrint from "./pages/barcodes";
import Products from "./pages/Products";

//Style Imports
import { Grid, makeStyles } from '@material-ui/core';

//Style Sheet
const useStyles = makeStyles({
  root : {
    display: 'flex',
    border: 5,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    height: '100 vh',
    padding: '30px 30px',
  },
  bar: {
    display: 'block',
    border: 5,
    height: '5vh',
    background: 'green',
    color: 'black',
    padding: '30px 30px',
  },

  general : {
    display: 'block',
    color: 'black',
    padding: '0px 0px',
  }
})


function App() {
  const  classes = useStyles();
  return (
    <Router>
      <div className={classes.root}>
      <TemporaryDrawer />
      
      <Switch>
        <Route path="/Products">
          <Grid container>
            <Grid item xs={12}>
              <ButtonAppBar className={classes.bar} />
            </Grid>
            <Grid item>
              <Products />
            </Grid>
          </Grid>  
        </Route>
        <Route path="/Suppliers">
          <div className={classes.general}>
            <h1> Supplier Table</h1>
          </div>
        </Route>
        <Route path="/addproduct">
          <Addproduct className={classes.general}/>
        </Route>
        <Route path="/barcode">
          <BarcodePrint className={classes.general}/>
        </Route>
        <Route path="/scanner">
          <Scanner />
        </Route>
      </Switch>
      
      </div>
    </Router>
  );
}

export default App;
