import firebase from 'firebase';
import {membershipBeginAction, membershipRejectAction} from "./shared";
import {sendNotification} from '../notifications';

export const signOut = () => {
    return dispatch => {
        dispatch(membershipBeginAction());

        let signOutUser = firebase.auth().signOut();

        return signOutUser.catch(error => {
            console.error(error);
            dispatch(membershipRejectAction(error));
            dispatch(sendNotification("Error on sign in"));
        });
    }
}