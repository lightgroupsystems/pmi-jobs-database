import actionTypes from '../constants/profileTypes';

const initialState =
{
    user: {
        email : "...",
        emailVerified : false,
        memberID : "...",
        name : "...",
        resume: null,
        resumeDate: null
    }
};

export default function profile(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ProfileInfoChanged:
            return {...state, user: action.payload};
        default:
            return state;
    }
}
