import firebase from 'firebase';
import actionTypes from '../../constants/adminTypes';

export const watchUsers = (startAt,) => {
    return (dispatch, getState) => {
      var users =  firebase.database().ref(`users`).limitToLast(20);
        var clearances = firebase.database().ref('clearances').limitToLast(20);
        
        users.on('child_added', (data) =>{
          dispatch(userAdded(data.key,data.val()));
        });
        clearances.on('child_added', (data) =>{
          dispatch(clearanceAdded(data.key,data.val()));
        });
        users.on('child_changed', (data) =>{
          dispatch(userChanged(data.key,data.val()));
        });
        clearances.on('child_changed',(data) =>{
          dispatch(clearanceChanged(data.key,data.val()));
        });
        users.on('child_removed', (data) =>{
          dispatch(userRemoved(data.key,data.val()));
        });
        clearances.on('child_removed',(data) =>{
          dispatch(clearanceRemoved(data.key,data.val()));
        });
    }
}

const userAdded = (key,val) =>{
  return {
    type: actionTypes.UserAdded,
    payload: {key,val}
  }
}
const clearanceAdded = (key,val) =>{
  return {
    type: actionTypes.ClearanceAdded,
    payload: {key,val}
  }
}
const userChanged = (key,val) =>{
  return {
    type: actionTypes.UserChanged,
    payload: {key,val}
  }
}
const clearanceChanged = (key,val) =>{
  return {
    type: actionTypes.ClearanceChanged,
    payload: {key,val}
  }
}
const userRemoved = (key,val) =>{
  return {
    type: actionTypes.UserRemoved,
    payload: {key,val}
  }
}
const clearanceRemoved = (key,val) =>{
  return {
    type: actionTypes.ClearanceRemoved,
    payload: {key,val}
  }
}

export const offWatchUsers = () => {
  return (dispatch, getState) => {
    return firebase.database().ref(`users`).off();
  }
}

export const isAdminChanged = (userID, val) => {
  var updates = {};

    updates['/clearances/' + userID + '/isAdmin'] = val;

    firebase.database().ref().update(updates).then(function() {
        console.log("User succesfully updated.");
    }).catch(function(error) {
        console.error("Error updating document: ", error);
    });


    return {
        type: actionTypes.ClearanceChanged,
        payload: {userID}
    }
}

export const isMemberChanged = (userID, val) => {
    var updates = {};

    updates['/clearances/' + userID + '/isMember'] = val;

    firebase.database().ref().update(updates).then(function() {
        console.log("User succesfully updated.");
    }).catch(function(error) {
        console.error("Error updating document: ", error);
    });


    return {
        type: actionTypes.ClearanceChanged,
        payload: {userID}
    }
}

export const isCompanyChanged = (userID, val) => {
    var updates = {};

    updates['/clearances/' + userID + '/isCompany'] = val;

    firebase.database().ref().update(updates).then(function() {
        console.log("User succesfully updated.");
    }).catch(function(error) {
        console.error("Error updating document: ", error);
    });
    return {
        type: actionTypes.ClearanceChanged,
        payload: {userID}
    }
}

export const isUserDeleted = (userID)=>{
    var updates = {};

    updates['/clearances/' + userID] = null;
    updates['/users/' + userID] = null;

    firebase.database().ref().update(updates).then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    return {
        type: actionTypes.UserRemoved,
        payload: {userID}
    }
}