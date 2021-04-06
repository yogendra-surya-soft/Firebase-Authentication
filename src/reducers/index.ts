import { combineReducers } from 'redux';
import { UserData } from '../actions';
import UserReducer from './UserReducer';

export interface StoreState {
    currentUser: UserData | null;
}

export default combineReducers<StoreState>({
    currentUser: UserReducer
});
