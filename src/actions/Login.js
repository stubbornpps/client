import {loginInConst} from '../constant/Login';
import axios from '../axios/Axios';

export const Log = (user) =>{
    return async(dispatch)=>{     
        dispatch({type:loginInConst.USER_LOGIN_REQ}) ;  
       await axios.post('/login',{
            ...user
        })
        .then(res=>{                                    
                dispatch({type:loginInConst.USER_LOGIN_SUCCESS,                    
                    payload:res.data                
                });                                 
        })
        .catch(error=>{                         
          console.log(error);
        })
    }
}
export const Logout = () =>{
    return async(dispatch)=>{     
        dispatch({type:loginInConst.USER_LOGOUT_REQ})
    }
}