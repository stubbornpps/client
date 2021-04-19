import {jokeConst} from '../constant/Login';

const initState = {        
    loading:false,
    joke: [] ,
};
const Joke = (state =initState , action) =>{    
    switch(action.type){        
        case jokeConst.JOKE_REQ :                    
            state={
                ...state,                
                loading:true,
            }
            break;            
        case jokeConst.JOKE_SUCCESS :                    
            state={
                ...state,                
                loading:false,                           
                joke:action.payload,                                
            }
            break;            
        default :   
         state ={...state}
        }
        return state        
}


export { Joke };