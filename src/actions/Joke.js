import {jokeConst} from '../constant/Login';
import axios from 'axios';

export const JokeFetch = () =>{
    return async(dispatch)=>{             
        dispatch({type:jokeConst.JOKE_REQ}) ;  
       await axios.get('https://official-joke-api.appspot.com/jokes/ten')       
        .then(res=>{                        
                dispatch({type:jokeConst.JOKE_SUCCESS,                    
                    payload:res.data                
                });                                 
        })
        .catch(error=>{                         
          console.log(error);
        })
    }
}