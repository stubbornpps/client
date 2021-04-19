import React from 'react'
import {Redirect , Route} from 'react-router-dom';
import {getToken} from '../constant/Common';
export const PrivateRoute = ({component:Component,...rest}) =>(
    <Route {...rest} render ={props => getToken() !=null ?(<Component {...props} /> ):(<Redirect to ={{pathname:'/login',state:{from:props.location}}} />
    )
}
/>
);
