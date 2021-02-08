import React from 'react';
import { useDrag } from 'react-dnd';

// material
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// style
import useStyles from 'assets/jss/components/form/control';

export default function Control({ data }) {
  const classes = useStyles();
  const [{ isDragging }, drag] = useDrag({
    item: { ...data },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  return (
    <ListItem ref={drag} button className={classes.itemControl}>
      <ListItemIcon className={classes.iconControl}>{data.icon}</ListItemIcon>
      <ListItemText className={classes.txtControl} primary={data.name} />
    </ListItem>
  );
}
