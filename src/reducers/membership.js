import localRepository from '../localRepository';
import membershipTypes from '../constants/membershipTypes';

const initialState =
{
    isLoading: false,
    isAuthenticated: localRepository.isAuthenticated.get(),
    isAuthorized: localRepository.isAuthorized.get(),
    currentUser: null,
    currentUserID: localRepository.currentUserID.get(),
    clearances: localRepository.clearances.get(),
    error: null
};

export default function membership(state = initialState, action) {
    switch (action.type) {
        case membershipTypes.BeginAction:
            return {...state, isLoading: true};
        case membershipTypes.RejectAction:
            return {...state,
                error: action.error,
                currentUser: null,
                isAuthenticated: false,
                isAuthorized: false,
                clearances: null,
                isLoading: false
            };
        case membershipTypes.UserAuthChanged:
            let { isAuthenticated, isAuthorized, currentUser, currentUserID, clearances } = action.payload;
            let isLoading = false;

            localRepository.isAuthenticated.set(isAuthenticated);
            localRepository.isAuthorized.set(isAuthorized);
            localRepository.currentUserID.set(currentUserID);
            localRepository.clearances.set(clearances);

            return {...state, currentUser, isAuthenticated, isAuthorized, clearances, currentUserID, isLoading};
        case membershipTypes.RecoverPasswordDone:
            return {...state, isLoading: false};
        default:
            return state;
    }
}