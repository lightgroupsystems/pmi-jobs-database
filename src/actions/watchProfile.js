import firebase from 'firebase';
import actionTypes from '../constants/profileTypes';

export const watchProfile = () => {
    return (dispatch, getState) => {
        if (!getState().membership.currentUserID)
            return;

        const userID = getState().membership.currentUserID;

        return firebase.database().ref(`users/${userID}`).on('value', snap => {

            let userInfo = snap.val();

            dispatch(profileChanged(userInfo));

        })
    }
}

export const offWatchProfile = () => {
    return (dispatch, getState) => {
        if (!getState().membership.currentUserID)
            return;

        const userID = getState().membership.currentUserID;

        return firebase.database().ref(`users/${userID}`).off();
    }
}

const profileChanged = (user) => {
    return {
        type: actionTypes.ProfileInfoChanged,
        payload: user
    }
}