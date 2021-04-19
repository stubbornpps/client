import {taskConst} from '../constant/Login';

const initState = {            
    task: [] ,
    task_one:[],
    save_status:0,
    result_status:0
};
const Task = (state =initState , action) =>{    
    switch(action.type){        
        case taskConst.FETCH_ALL :                            
            state={
                ...state,                                
                task:action.payload,                                
            }
            break;                    
        case taskConst.REQUEST :           
            state={
                ...state,                                
                save_status:0,
                task_one:[],
            }
            break;                    
        case taskConst.CREATE :                                   
            state={
                ...state,                                
                save_status:1,
            }
            break;                    
        case taskConst.SUCCESS :                                   
            state={
                ...state,                                
                save_status:0,
            }
            break;                    
        case taskConst.DELETE :                                   
            state={
                ...state,                                
                task:state.task.filter(x=>x._id != action.payload)
            }
            break;                    
        case taskConst.FETCH_ONE :                                           
            state={
                ...state,            
                task_one:action.payload
            }
            break; 
            case taskConst.UPDATE:
                state={
                    ...state,
                    task:state.task.map(x=>x._id==action.payload._id?action.payload:x)
                }                   
        default :   
         state ={...state}
        }
        return state        
}


export { Task };