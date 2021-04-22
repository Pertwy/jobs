import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

export default function DeleteButton(props){

    const useStyles = makeStyles((theme) => ({
        // margin: {
        //   margin: theme.spacing(1),
        // },
        extendedIcon: {
          marginRight: theme.spacing(1),
        },
      }));
      
      const classes = useStyles();


    return ( 
        <IconButton onClick={()=>props.handleDelete(props.item)} aria-label="delete" className={classes.margin}>
            <DeleteIcon fontSize="small"/>
        </IconButton>
     );
}
 


