import { combineReducers } from 'redux';
import membership from './membership';
import notifications from './notifications';
import profile from './profile';
import resumes from './resumes';
import admin from './admin';
import userCard from './userCard';

export default combineReducers({
    membership,
    notifications,
    profile,
    resumes,
    admin,
    userCard
});



