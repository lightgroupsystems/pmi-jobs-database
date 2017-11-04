import firebase from 'firebase';
import actionTypes from '../../constants/membershipTypes';
import {membershipBeginAction} from "./shared";
import {signOut} from './signOut';
import {sendNotification} from "../notifications";

export const watchAuth = () => {
    return dispatch => {
        return firebase.auth().onAuthStateChanged(auth => {

            if (auth) // sign in
            {
                const userID = auth.uid;
                const emailVerified = auth.emailVerified;

                doUserAuthChanged(dispatch, userID, emailVerified);
            }
            else // sign out
            {
                dispatch(userAuthChanged({
                    isAuthenticated: false,
                    isAuthorized: false,
                    clearances: null,
                    currentUser: null,
                    currentUserID: null
                }));
            }

        })
    }
}

export const refreshUserInfo = () => {
    return dispatch => {
        dispatch(membershipBeginAction());

        firebase.auth().currentUser.reload();

        const userID = firebase.auth().currentUser.uid;
        const emailVerified = firebase.auth().currentUser.emailVerified;

        doUserAuthChanged(dispatch, userID, emailVerified);
    }
}

const doUserAuthChanged = (dispatch, userID, emailVerified) => {
    const getUser = firebase.database().ref(`users/${userID}`).once('value');
    const getClearances = firebase.database().ref(`clearances/${userID}`).once('value');

    Promise.all([getUser, getClearances]).then(([userResult, clearancesResult]) => {

        const currentUser = userResult.val();
        const clearances = clearancesResult.val() || { isMember: false, isAdmin: false };

        if (currentUser.emailVerified !== emailVerified) {
            currentUser.emailVerified = emailVerified;
            firebase.database().ref(`users/${userID}/emailVerified`).set(emailVerified);
        }

        dispatch(userAuthChanged({
            isAuthenticated: true,
            isAuthorized: emailVerified && (clearances.isMember || clearances.isAdmin),
            clearances: clearances,
            currentUser: currentUser,
            currentUserID: userID
        }));

    }).catch(error => {

        console.error(error);
        dispatch(signOut());
        dispatch(sendNotification("Error on auth"));

    })
}

const userAuthChanged = (user) => {
    return {
        type: actionTypes.UserAuthChanged,
        payload: user
    }
}