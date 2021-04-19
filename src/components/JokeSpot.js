import React,{useEffect} from 'react'
import { useDispatch, connect } from "react-redux";
import {        
    Grid,    
    withStyles,        
    Paper,
    Container,  
    Typography 
  } from "@material-ui/core";    
import { JokeFetch } from '../actions/Joke';
  const styles = (theme) => ({
    grid:{
        marginTop:'30px'
    },
    item:{        
        marginBottom:'10px'
    },
    paper:{
        width:'230px',
        height:'130px',
        padding:'20px',
        textAlign:'center'
    },
    Loading:{
        position:'absolute',
        top:'50%',
        left:'50%',
        transfrom:'Translate(-50,-50)'
    }
});
function JokeSpot({classes,...props}) {    
    const dispatch = useDispatch();    
    useEffect(()=>{
        dispatch(JokeFetch())
    },[])    
    return (
        <>          
        <Container>            
            <Typography variant="h3" style={{textAlign:'center',marginTop:'10px'}}>Jokes</Typography>
            <Grid container className={classes.grid}>                
                {
                props.responseJoke.loading ?   (<span className={classes.Loading}>Loading....</span>) :  (
                     props.responseJoke.joke.map((joke,index)=>{
                     return(
                        <Grid item xs={12} sm={3} lg={3} className={classes.item} key={index} >
                            <Paper  className={classes.paper} >
                                <div><Typography variant='p'>{joke.setup}</Typography></div>
                                <br />
                                <br />
                                <div style={{marginBottom:'12px'}}><Typography variant='p' style={{fontWeight:'bold'}}>{joke.punchline}</Typography></div>
                            </Paper>
                        </Grid>  
                     )
                 })
                )
                }
            </Grid>
        </Container>
        </>
    )
}

const mapStateToProps = (state) => ({
    responseJoke: state.Joke,
});
export default connect(mapStateToProps)(withStyles(styles)(JokeSpot))

