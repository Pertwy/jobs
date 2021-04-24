import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';

export default function SaveButton(props){

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
        <IconButton onClick={()=>props.handleSave()} aria-label="edit" className={classes.margin}>
            <SaveIcon/>
        </IconButton>
     );
}
 


