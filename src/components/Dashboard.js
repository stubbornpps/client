import React,{useEffect} from 'react';
import { useDispatch, connect } from "react-redux";
import {        
    Grid,    
    withStyles,        
    Paper,
    Container,  
    Button,Link
  } from "@material-ui/core";
import {TaskAll , Delete} from '../actions/Task';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

  const styles = (theme) => ({
    headline:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center'
    }
});
function Dashboard({classes,...props}) {
    const dispatch = useDispatch();    
    useEffect(()=>{
        dispatch(TaskAll())
    },[])      
    const status = (end) =>{   
        var d = new Date(); 
        var m = d.getMinutes();
        var h = d.getHours();
        if(h == '0') {h = 24}
        var currentTime = h+"."+m;            
        var time = end.split(":");
        var hour = time[0];
        if(hour == '00') {hour = 24}
        var min = time[1];
        
        var inputTime = hour+"."+min;                                    
        if(h > time[0]){
            return 'Expired';
        }
        if(time[0] > h){
            return 'Upcoming';
        }            
        if(h == time[0]){
            return 'Running';
        }            
    }  
    const onDelete = id =>{             
         if(window.confirm('Are you sure to delete this record ?'))
            dispatch(Delete(id))
     }
    return (
        <>         
        <Container>
            <Grid container>                                
                <Grid item lg={12} xs={12} className={classes.headline} >
                        <h1>Tasks</h1>
                        <Button variant="contained" color="primary" onClick={()=>{props.history.push('/add')}}>Add Task</Button>
                </Grid>                              
                <Grid item lg={12}>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                        <TableRow>
                            <TableCell>Taskname</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Edit</TableCell>                            
                            <TableCell align="right">Delete</TableCell>                            
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {props.allTask.task.map((task,index)=>{
                              return(
                                <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {task.taskname}
                            </TableCell>
                            <TableCell align="right">{task.description}</TableCell>
                            <TableCell align="right">{status(task.end)}</TableCell>
                            <TableCell align="right"><Link to={`/edit/${task._id}`}  style={{textDecoration:'none'}}><Button variant="contained" style={{backgroundColor:'yellow',color:'white',border:'none'}}  onClick= {()=>{props.history.push(`/edit/${task._id}`)}} >Edit</Button></Link></TableCell>
                            <TableCell align="right"><Button variant="contained" style={{backgroundColor:'red',color:'white',border:'none'}} onClick={()=>onDelete(task._id)} >Delete</Button></TableCell>
                            </TableRow>
                              )  
                        })
                            
                        }
                        </TableBody>
                    </Table>
                    </Paper>
                </Grid>
            </Grid>
        </Container>   

        </>
    )
}

const mapStateToProps = (state) => ({
    allTask: state.Task,
});
export default connect(mapStateToProps)(withStyles(styles)(Dashboard))
