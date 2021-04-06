import ActionTypes from './types';

export interface UserData {
    user: {
        uid: string;
        email: string;
        emailVerified: boolean;
        providerData: [
            {
                uid: string;
                displayName: string | null;
                photoURL: null;
            }
        ];
        lastLoginAt: string;
        createdAt: 'string';
    };
}

export interface SetCurrentUserAction {
    type: ActionTypes.setCurrentUser;
    payload: UserData | null;
}

export const setCurrentUser = (user: UserData | null = null): SetCurrentUserAction => {
    return {
        type: ActionTypes.setCurrentUser,
        payload: user
    };
};
