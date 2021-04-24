import React from 'react';
import { AppBar, Typography , withStyles, Box, Button, recomposeColor } from '@material-ui/core';
import { removeUserSession } from '../constant/Common';
import {  Link,useLocation } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import {Logout} from '../actions/Login';

const styles = theme =>({ 
    navbar:{
      fontFamily: 'Noto Sans JP',
      background:'#0066cc',
      padding:'8px',
      color:"white",      
    },
    header:{    
      margin: theme.spacing(1),
      color:'white',      
    },
    buttonLog:{
        width:'100px',
        height:'35px',
        color:'white',
        borderColor:'white',        
        marginRight:'12px',      
        textDecoration:'none'  
    },
    title:{
        fontSize:'30px',
        marginLeft:'25px'
    },
    asideClass:{
        display:'Flex',
    }
  })

function Header({classes,...props}) {  
    const dispatch =useDispatch();
    const logout = ()=>{
        dispatch(Logout());
        removeUserSession();    
        // console.log(props);
    }
    const location = useLocation();
    const buttonVariation = (pathname) =>{
        if(pathname==="/dash" || pathname==="/jokespot" || pathname==="/add" ){
            return(
                <div className={classes.asideClass}>   
                {pathname !="/jokespot"?(<Link to="/jokespot"  style={{textDecoration:'none'}}><Button  className={classes.buttonLog}  variant="outlined"  >JokeSpot</Button></Link> ):(<Link to="/dash"  style={{textDecoration:'none'}}><Button  className={classes.buttonLog}  variant="outlined"  >DashBoard</Button></Link>) }       
            <Link style={{textDecoration:'none'}}><Button  className={classes.buttonLog}  variant="outlined" onClick={logout} >
               Log Out
            </Button></Link> </div> )
        }        
}      
    return (
        <>
        <AppBar position="static" color="inherit" className={classes.navbar} >        
            <Box display="flex" alignItems="center">
            <Box width="100%" display="flex"  alignItems="center" >            
            <Typography variant="h5" className={classes.title}>
                <Link to='/' style={{textDecoration:'none',color:'white'}}>
                Demo
                </Link>                
            </Typography>
            </Box>        
            <Box>
                {buttonVariation(location.pathname)}                

            </Box>                
            </Box>                        
        </AppBar>       
        </>
    )
}

export default (withStyles(styles)(Header)) 
