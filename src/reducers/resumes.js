import actionTypes from '../constants/resumeTypes';

const initialState =
{
    isLoading: false,
    error: null
};

export default function resumes(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ResumeUploadBegin:
            return {...state, isLoading: true};
        case actionTypes.ResumeUploadDone:
            return {...state, isLoading: false};
        case actionTypes.ResumeUploadRejected:
            return {...state, isLoading: false, error: action.error};
        default:
            return state;
    }
}