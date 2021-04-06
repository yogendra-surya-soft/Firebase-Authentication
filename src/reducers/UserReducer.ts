import { SetCurrentUserAction, UserData } from '../actions';
import ActionTypes from '../actions/types';

const UserReducer = (state: UserData | null = null, action: SetCurrentUserAction) => {
    switch (action.type) {
        case ActionTypes.setCurrentUser:
            return action.payload;
        default:
            return state;
    }
};

export default UserReducer;
