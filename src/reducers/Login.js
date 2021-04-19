import {loginInConst} from '../constant/Login';

const initState = {        
    success:false,  
    response:''  ,
};
const Log = (state =initState , action) =>{    
    switch(action.type){        
        case loginInConst.USER_LOGIN_REQ :                    
            state={
                ...state,                
                success:false,                                                
            }
            break;            
        case loginInConst.USER_LOGIN_SUCCESS :                    
            state={
                ...state,                
                success:true,                                
                response:action.payload,                                
            }
            break;            
        default :   
         state ={...state}
        }
        return state
        
}


export { Log };