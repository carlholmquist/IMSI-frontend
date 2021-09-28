// Package Imports
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// Hook Imports
import { useState } from "react";

//Component Imports
import ButtonAppBar from './components/NavBar/NavBar';
import Scanner from "./pages/scanner";
import TemporaryDrawer from "./components/Drawer/temporarydrawer";
import Received from "./components/Received/Received";

//Page Imports
import BarcodePrint from "./pages/barcodes";
import Products from "./pages/Products";

//Style Imports
import { Grid, makeStyles } from '@material-ui/core';

//Style Sheet
const useStyles = makeStyles({
  root : {
    display: 'block',
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
  const [state, setState] = useState({left: false});

  const toggleDrawer = (open) => (event) => {
    console.log('This worked');
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ 'left': open });
  };

  return (
    <Router>
      <div className={classes.root}>
      <ButtonAppBar toggleDrawer={toggleDrawer} className={classes.bar} />
      <TemporaryDrawer state={state} toggleDrawer={toggleDrawer} />
      
      <Switch>
        <Route path="/products">
          <Grid container>
            <Grid item xs={12}>
              
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
        <Route path="/barcode">
          <BarcodePrint className={classes.general}/>
        </Route>
        <Route path="/scanner">
          <Scanner />
        </Route>
        <Route path="/receiving">
          <Received />
        </Route>
      </Switch>
      
      </div>
    </Router>
  );
}

export default App;
