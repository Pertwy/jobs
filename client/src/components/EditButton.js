import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

export default function EditButton(props){

    const useStyles = makeStyles((theme) => ({
        margin: {
          margin: theme.spacing(1),
        },
        extendedIcon: {
          marginRight: theme.spacing(1),
        },
      }));
      
      const classes = useStyles();


    return ( 
        <IconButton onClick={()=>props.handleEdit(props.item)} aria-label="edit" className={classes.margin}>
            <EditIcon fontSize="small"/>
        </IconButton>
     );
}
 


