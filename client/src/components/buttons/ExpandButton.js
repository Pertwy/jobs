import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded';

export default function ExpandButton(props){

    const useStyles = makeStyles((theme) => ({
        // margin: {
        //   margin: theme.spacing(1),
        // },
        extendedIcon: {
          marginRight: theme.spacing(1),
        },
      }));
      
      const classes = useStyles();


      let butt 
      props.expand ? butt = <RemoveCircleOutlineRoundedIcon /> : butt = <AddCircleOutlineRoundedIcon/>


    return ( 
        <IconButton onClick={()=>props.handleExpand()} aria-label="edit" className={classes.margin}>
            {butt}
        </IconButton>
     );
}
 


