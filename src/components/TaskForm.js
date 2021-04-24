import React,{useState,useEffect} from 'react';
import { useDispatch, connect } from "react-redux";

import {   
    Typography,     
    Grid,    
    withStyles,        
    Paper,
    TextField,
    Container,  
    Button,
    Link    
  } from "@material-ui/core";
  import {
    useParams,
    useLocation
  } from "react-router-dom";
  import {Add,Get,Update}  from '../actions/Task';
  const styles = (theme) => ({
    paper: {        
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
      timediv:{       
          display:'flex',
          justifyContent:'space-around' ,          
      },
      time:{
          width:'200px'
      }
});
function TaskForm({classes,...props}) {    
    const { id } = useParams();      
    const location = useLocation();
    const init = {taskname:'',description:'',start:'',end:''};
    const [intask,setIntask] = useState(init);    
    const [error,setError] = useState('');
    const dispatch = useDispatch();    
    
    
    const taskSubmit =(e)=>{
        e.preventDefault();       
        if(location.pathname !="/add"){                  
            dispatch(Update(id,intask));
        } else{            
            if(intask.taskname == '' || intask.description == '' || intask.start =='' || intask.end ==''){
                setError({ helperText: 'Invalid format', error_status: true })                
            }
            if(intask.taskname != '' && intask.description != '' && intask.start !='' && intask.end !=''){
                dispatch(Add(intask));    
                setError('');
            }
        }
    }
    useEffect(()=>{
        if(location.pathname !="/add"){                                   
        dispatch(Get(id));                                                 
        }
    },[])
    useEffect(()=>{
        if(location.pathname !="/add"){                                                                        
            setIntask(props.edit);
        }
    },[props.edit])
    useEffect(()=>{
        if(props.responseStatus ==1){               
            setTimeout(function() {
                alert('Task Added !');
                props.history.push('/dash');
              }, 3000);
        }
    },[props.responseStatus])       
    return (
        <>  
            <Container >
                <Grid container>                
                    <Grid item xs={12} style={{textAlign:"center"}} >
                        { location.pathname=="/add" ? (<h1>   Add Task     </h1>) :(<h1>   Edit Task     </h1>)  }                                                 
                                {
                                    
                                    error.error_status ? (<p style={{textAlign:'center',color:'red'}}>All field required *</p>) :('')
                                }
                    </Grid>
                    <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}}  >
                    <div className={classes.paper}>                                                                                                
                                
                                
                        <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="taskname"
                            label="Task Name"
                            name="taskname"
                            autoComplete="taskname"
                            autoFocus       
                            onChange={(e) => {
                                setIntask({
                                    ...intask,
                                    taskname: e.target.value,
                                });
                            }}
                            value={intask.taskname}                          
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="description"
                            label="Task Description"                            
                            id="description"
                            autoComplete="current-description"
                            onChange={(e) => {
                                setIntask({
                                    ...intask,
                                    description: e.target.value,
                                });
                            }}
                            value={intask.description}                          
                        />      
                        <div className={classes.timediv}>            
                          <TextField

                                id="stime"
                                label="Start Time"
                                type="time"                                
                                className={classes.time}
                                

                                InputLabelProps={{
                                shrink: true,
                                }}
                                inputProps={{
                                step: 300, // 5 min
                                }}
                                onChange={(e) => {
                                    setIntask({
                                      ...intask,
                                      start: e.target.value,
                                    });
                                }}
                                value={intask.start}                          
                            />      
                        
                          <TextField
                                id="etime"
                                label="End Time"
                                type="time"                                                             
                                className={classes.time}
                                InputLabelProps={{
                                shrink: true,
                                }}
                                inputProps={{
                                step: 300, // 5 min
                                }}
                                onChange={(e) => {
                                    setIntask({
                                      ...intask,
                                      end: e.target.value,
                                    });
                                }}
                                value={intask.end}   
                            />   
                            </div>               
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={taskSubmit}
                        >
                            {location.pathname !="/add"?('Update'):('Add')}                           
                        </Button>                        
                        </form>
                    </div>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
const mapStateToProps = (state) => ({    
    edit:state.Task.task_one,
    responseStatus:state.Task.save_status,
});

export default connect(mapStateToProps)(withStyles(styles)(TaskForm)) 
