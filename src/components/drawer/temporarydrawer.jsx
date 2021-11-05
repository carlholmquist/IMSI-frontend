import * as React from 'react';
import { Box } from '@material-ui/core';
import {Drawer} from '@material-ui/core';
import {List} from '@material-ui/core';
import { Divider } from '@material-ui/core';
import {ListItem} from '@material-ui/core';
import {ListItemText} from '@material-ui/core';
import { Link } from 'react-router-dom';


export default function TemporaryDrawer(props) {
  const {toggleDrawer} = props;
  console.log('This is props', props)
  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
          {['Products', 'Suppliers', 'Clients','ItemInfo','consumeitem'].map((text, index) => (
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
            <Link ket={index} to={`/${text}`}>
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
          <Drawer
            anchor={'left'}
            open={props.state['left']}
            onClose={toggleDrawer(false)}
          >
            {list()}
          </Drawer>
    </div>
  );
}
