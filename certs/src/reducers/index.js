import {combineReducers} from 'redux';
import CertReducer from './certReducer';

const combinedReducers = combineReducers({
    certs: CertReducer
});

export default combinedReducers;