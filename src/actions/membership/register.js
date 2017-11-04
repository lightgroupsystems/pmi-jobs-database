import firebase from 'firebase';
import {membershipBeginAction, membershipRejectAction} from "./shared";
import {sendNotification} from '../notifications';

export const register = (name, memberID, email, password) => {
    return dispatch => {
        dispatch(membershipBeginAction());

        let createAuthUser = firebase.auth().createUserWithEmailAndPassword(email, password);

        return createAuthUser
            .then(auth => addNewUser(auth, name, memberID, email))
            .then(auth => sendEmailWithSilentErrors(auth))
            .catch(error => {
                console.error(error);
                dispatch(membershipRejectAction(error));
                dispatch(sendNotification("Error on register a user"));
            });
    }
}

const addNewUser = (auth, name, memberID, email) => {
    return new Promise((resolve, reject) => {

        const userID = auth.uid;
        const emailVerified = auth.emailVerified;

        let addUser = firebase.database().ref(`users/${userID}`).set({
            name: name,
            memberID: memberID,
            email: email,
            emailVerified: emailVerified
        })

        return addUser
            .then(() => resolve(auth))
            .catch(error => {

                auth.delete(); // try to delete the invalid user.

                reject(error);

            });

    })
}

const sendEmailWithSilentErrors = (auth) => {
    return new Promise((resolve, reject) => {
        auth.sendEmailVerification()
            .then(resolve())
            .catch(error => {
                console.error(error);
                resolve();
            });
    });
}