import * as React from 'react';
import { Box } from '@material-ui/core';
import {Drawer} from '@material-ui/core';
import {List} from '@material-ui/core';
import { Divider } from '@material-ui/core';
import {ListItem} from '@material-ui/core';
import {ListItemText} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';


export default function TemporaryDrawer() {
  const [state, setState] = React.useState({left: false});

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ 'left': open });
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
          {['Products', 'Suppliers', 'Clients', 'addproduct'].map((text, index) => (
            <Link to={`/${text}`}>
            <ListItem button key={text}>
             
              <ListItemText primary={text} />
            </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {['scanner', 'barcode'].map((text, index) => (
            <Link to={`/${text}`}>
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
            </Link>
          ))}
        </List>
    </Box>
  );

  return (
    <div>
          <Button onClick={toggleDrawer(true)}>Menu</Button>
          <Drawer
            anchor={';eft'}
            open={state['left']}
            onClose={toggleDrawer(false)}
          >
            {list()}
          </Drawer>
    </div>
  );
}
