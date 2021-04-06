import { auth } from './firebase';

export const register = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
};

export const login = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
};

export const signOut = () => {
    return auth.signOut();
};
