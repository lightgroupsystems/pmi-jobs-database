import firebase from 'firebase';
import {membershipBeginAction, membershipRejectAction} from "./shared";
import {sendNotification} from '../notifications';
import actionTypes from '../../constants/membershipTypes';

export const recoverPassword = (email) => {
    return dispatch => {
        dispatch(membershipBeginAction());

        let recoverPassword = firebase.auth().sendPasswordResetEmail(email);

        return recoverPassword
            .then(() => dispatch(recoverPasswordDone()))
            .catch(error => {
                console.error(error);
                dispatch(membershipRejectAction(error));
                dispatch(sendNotification("Error on recover password"));
            });
    }
}

const recoverPasswordDone = () => {
    return {
        type: actionTypes.RecoverPasswordDone
    };
}