import {taskConst} from '../constant/Login';
import axios from '../axios/Axios';

export const TaskAll = () =>{
    return async(dispatch)=>{             
       await axios.get('/get')
        .then(res=>{                      
                dispatch({type:taskConst.FETCH_ALL,                    
                    payload:res.data                
                });                                 
        })
        .catch(error=>{                         
          console.log(error);
        })
    }
}
export const Add = (intask) =>{
    return async(dispatch)=>{  
        dispatch({type:taskConst.REQUEST});                     
        await axios.post('/save',{
            ...intask
        })
        .then(res=>{                                  
                 dispatch({type:taskConst.CREATE,                    
                     payload:res.data                
                 });  
                 dispatch({type:taskConst.SUCCESS})                               
         })
         .catch(error=>{                         
           console.log(error);
         })
     }
}
export const Delete = (id) =>{
    return async(dispatch)=>{                  
        await axios.delete(`/${id}`)
        .then(res=>{              
                 dispatch({type:taskConst.DELETE,                    
                     payload:id
                 });                   
         })
         .catch(error=>{                         
           console.log(error.response.data);
         })
     }
}
export const Get = (id) =>{
    return async(dispatch)=>{                  
        dispatch({type:taskConst.REQUEST});                             
        await axios.get(`/getone/${id}`)
        .then(res=>{     
            console.log(res.data)                            ;
                 dispatch({type:taskConst.FETCH_ONE,                    
                     payload:res.data
                 });                   
         })
         .catch(error=>{                         
           console.log(error.response.data);
         })
     }
}
export const Update = (id,intask) =>{
    return async(dispatch)=>{  
        dispatch({type:taskConst.REQUEST});                     
        await axios.put(`/${id}`,{
            ...intask
        })
        .then(res=>{        
            console.log(res.data)                     
                 dispatch({type:taskConst.UPDATE,                    
                     payload:res.data                
                 });  
                 dispatch({type:taskConst.SUCCESS})                               
         })
         .catch(error=>{                         
           console.log(error);
         })
     }
}
