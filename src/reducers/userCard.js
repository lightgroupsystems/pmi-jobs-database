import actionTypes from '../constants/userCardTypes';

const initialState =
    {
        user: {}
    };

export default function UserCard(state = initialState, action) {
    switch (action.type) {
        case actionTypes.isAdminChanged:
            var user = { ...state.user, isAdmin: action.payload };
            return { ...state, user };

        case actionTypes.isMemberChanged:
            var user = { ...state.user, isMember: action.payload };
            return { ...state, user };

        case actionTypes.isCompanyChanged:
            var user = { ...state.user, isCompany: action.payload };
            return { ...state, user };

        case actionTypes.isUserDeleted:
            var user = { ...state.user, isCompany: action.payload };
            return { ...state, user };

        default:
            return state;
    }
}
