import firebase from 'firebase';
import actionTypes from '../../constants/profileTypes';

export const watchUsers = () => {
    return (dispatch, getState) => {
        return firebase.database().ref(`users`).on('value', snap => {
            var users = [];
            snap.forEach((item) =>{
              var val = item.val();
              val.userID = item.key;
              users.push(val);
            });
            dispatch(profileChanged(users));
        })
    }
}

export const offWatchUsers = () => {
    return (dispatch, getState) => {
      return firebase.database().ref(`users`).off();
    }
}

const profileChanged = (users) => {
    return {
        type: actionTypes.ProfileInfoChanged,
        payload: users
    }
}
