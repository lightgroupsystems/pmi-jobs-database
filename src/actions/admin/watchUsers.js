import firebase from 'firebase';
import actionTypes from '../../constants/adminTypes';

export const watchUsers = () => {
    return (dispatch, getState) => {
        return firebase.database().ref(`users`).on('value', snap => {
            var users = [];
            var promises = [];
            snap.forEach((item) =>{
              var val = item.val();
              val.userID = item.key;
              promises.push(firebase.database().ref(`clearances/${val.userID}`).once('value', snap => {
                var clearances = snap.val();
                val.clearances = clearances;
                users.push(val);
              }));
            });
            Promise.all(promises)
              .then((values) =>{
                dispatch(usersChanged(users));
              });
        })
    }
}

export const offWatchUsers = () => {
    return (dispatch, getState) => {
      return firebase.database().ref(`users`).off();
    }
}

const usersChanged = (users) => {
    return {
        type: actionTypes.UsersChanged,
        payload: users
    }
}
