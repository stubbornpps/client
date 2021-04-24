import React, { useState, useEffect } from 'react';
import LoginImage from '../images/login.png';
import {withRouter} from 'react-router-dom';
import { setUserSession,getToken} from '../constant/Common'
import {        
    Grid,    
    withStyles,        
    Typography,
    Button,
    CssBaseline,
    InputBase
  } from "@material-ui/core";  
import { useDispatch, connect } from "react-redux";
import {Log} from '../actions/Login';
const styles = (theme) => ({
    root: {
        height: '93vh',
      },
    image: {
        backgroundImage: 'url('+LoginImage+')',
        backgroundRepeat: 'no-repeat',        
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    loginsection:{
        width:'100%',
        height:'100%',
        backgroundColor:'#0066cc',     
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        padding:'9px'
    },
    submit:{
        color:'white',
        padding:'9px',
        borderRadius:'20px',
        backgroundColor:'#5a9ef1'    
    },
    textinput:{
        color:'black',                     
        border:'2px solid white',
        borderRadius:'20px',
        padding:theme.spacing(1),
        backgroundColor:'white',  
        marginBottom:'30px',                
    },    
    inputfield:{
        padding:'10px',        
    },
    btnlabel:{
        fontSize:'19px',
        letterSpacing:'2px',        
    },
    font_icn:{     
        fontSize:'30px',color:'white',cursor:'pointer',           
    }    
});
function Login({ classes, ...props}) {
                        
    const dispatch = useDispatch();
    const intialState ={
        email:'',
        password:''
    };    
    const [user,setUser] = useState(intialState);
    const [error,setError] = useState('');
    
    const submitLoginIn = (e)=>{
        e.preventDefault();        
        if(user.email == '' || user.password == ''){
            setError({ helperText: 'Invalid format', error_status: true })
            
        }        
        if(user.password != '' && user.email != ''){
            dispatch(Log(user));                           
            setError('');
        }
    }     
    useEffect(()=>{                            
        if(props.responseLog.success && getToken() == null){      
            setUserSession(props.responseLog.response.token,"random");                                   
            props.history.push('/dash');
        }
    },[props.responseLog.success])
    
    return (
        <>                                                 
                <Grid container className = {classes.root}>                
                    <CssBaseline />
                    <Grid item xs={12} sm={4} md={6} lg={6} >
                        <div className={classes.loginsection}>      
                            <div>      
                                <Typography component="h1" variant="h2" style={{color:'white', letterSpacing:'2px'}} gutterBottom>
                                    Welcome
                                </Typography>
                                {
                                    error.error_status ? (<p style={{textAlign:'center',color:'red'}}>All field required *</p>) :('')
                                }
                                
                            </div>
                            <div>      
                            <form>                            
                            <InputBase  
                            variant="outlined"                            
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            type='text'                            
                            placeholder='Enter Your Email'
                            className={classes.textinput}
                            classes={{
                                input:classes.inputfield
                            }}
                            onChange={(e) => {
                                setUser({
                                  ...user,
                                  email: e.target.value,
                                });
                              }}
                                                        
                            />
                            <InputBase
                            variant="outlined"                            
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            placeholder="Enter Your Password"
                            className={classes.textinput}                                                        
                            autoComplete="current-password"
                            classes={{
                                input:classes.inputfield
                            }}
                            onChange={(e) => {
                                setUser({
                                  ...user,
                                  password: e.target.value,
                                });
                              }}
                                                
                            />
                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"                            
                            className={classes.submit}
                            classes={{
                               label:classes.btnlabel
                            }}
                            onClick={submitLoginIn}
                            >
                            Login In
                            </Button>                            
                            </form>
                            </div>
                            <div style={{marginTop:"25px",padding:'20px'}}>                                  
                            </div>                            
                        </div>
                    </Grid>
                    <Grid item xs={false} sm={4} md={6} lg={6} className={classes.image} ></Grid>
                </Grid>                                                       
        </>
    )

}
const mapStateToProps = (state) => ({
    responseLog: state.Log,
});
export default  withRouter(connect(mapStateToProps)(withStyles(styles)(Login)))
