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

/*export default function profile(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ProfileInfoChanged:
            return {...state, user: action.payload};
        default:
            return state;
    }
}*/

export default function profile(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ProfileInfoChanged:
            return {...state, user: action.payload};
        case actionTypes.isAdminChanged:
            var user = { ...state.user, isAdmin: action.payload };
            return { ...state, user };
        case actionTypes.isMemberChanged:
            var user = { ...state.user, isMember: action.payload };
            return { ...state, user };
        case actionTypes.isCompanyChanged:
            var user = { ...state.user, isCompany: action.payload };
            return {...state, user};
        default:
            return state;
    }
}