import {combineReducers} from 'redux';
import {Log} from '../reducers/Login';
import {Joke} from '../reducers/Joke';
import {Task} from '../reducers/Task';

export default combineReducers({
    Log,
    Joke,
    Task
});
