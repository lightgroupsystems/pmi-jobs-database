import firebase from 'firebase';
import {membershipBeginAction, membershipRejectAction} from "./shared";
import {sendNotification} from '../notifications';

export const signIn = (email, password) => {
    return dispatch => {
        dispatch(membershipBeginAction());

        let signInUser = firebase.auth().signInWithEmailAndPassword(email, password);

        return signInUser.catch(error => {
            console.error(error);
            dispatch(membershipRejectAction(error));
            dispatch(sendNotification("Incorrect email or password"));
        });
    }
}