import firebase from 'firebase';
import {membershipBeginAction, membershipRejectAction} from "./shared";
import {sendNotification} from '../notifications';

export const register = ({ name, memberID, companyName, email, password, userType }) => {
    return dispatch => {
        dispatch(membershipBeginAction());

        let createAuthUser = firebase.auth().createUserWithEmailAndPassword(email, password);

        return createAuthUser
            .then(auth => addNewUser({ auth, name, memberID, companyName, email, userType }))
            .then(auth => sendEmailWithSilentErrors(auth))
            .catch(error => {
                console.error(error);
                dispatch(membershipRejectAction(error));
                dispatch(sendNotification("Error on register a user"));
            });
    }
}

const addNewUser = ({ auth, name, memberID, companyName, email, userType }) => {
    return new Promise((resolve, reject) => {

        const userID = auth.uid;
        const emailVerified = auth.emailVerified;

        let fUser = { name, memberID, email, emailVerified, userType };

        if (userType === "company")
            fUser = { name, companyID: cleanWord(companyName), companyName, email, emailVerified, userType };

        let addUser = firebase.database().ref(`users/${userID}`).set(fUser);

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

const cleanWord = (word) => {
    const letters = "1234567890QWERTYUIOPASDFGHJKLZXCVBNM";

    if(isEmpty(word))
        return "";

    const upperWord = word.toUpperCase();

    const upperArr = upperWord.split("");

    const filteredArr = upperArr.filter(x => letters.includes(x));

    return filteredArr.slice(0, 20).join("");
}

const isEmpty = (value) => {
    return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
}