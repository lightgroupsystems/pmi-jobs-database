import firebase from 'firebase';
import actionTypes from '../constants/resumeTypes';
import {sendNotification} from './notifications';

export const uploadResume = (userID,file) => {
    return (dispatch, getState) => {
        if (!userID) {
            dispatch(sendNotification("Error on upload your resume"));
            return;
        }

        dispatch(uploadResumeBegin());
        let resumeRef = firebase.storage().ref(`/users/${userID}/resume.pdf`);

        return resumeRef.put(file)
            .then(snap => saveResumeOnProfile(userID, snap.downloadURL))
            .then(() => {
                dispatch(uploadResumeDone());
                dispatch(sendNotification("Your resume was uploaded successfully"));
            })
            .catch(error => {
                console.error(error);
                dispatch(uploadResumeReject(error));
                dispatch(sendNotification("Error on upload your resume"));
            });
    }
}

const saveResumeOnProfile = (userID, resumeUrl) => {
    return new Promise((resolve, reject) => {

        let updateUserResume = firebase.database().ref(`users/${userID}`).update({
            resume: resumeUrl,
            resumeDate: firebase.database.ServerValue.TIMESTAMP
        });

        return updateUserResume
            .then(() => resolve())
            .catch(error => {
                reject(error);
            });

    })
}

const uploadResumeBegin = () => {
    return {
        type: actionTypes.ResumeUploadBegin
    };
}

const uploadResumeDone = () => {
    return {
        type: actionTypes.ResumeUploadDone
    };
}

const uploadResumeReject = (error) => {
    return {
        type: actionTypes.ResumeUploadRejected,
        error: error
    }
}
