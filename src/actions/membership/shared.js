import actionTypes from '../../constants/membershipTypes';

export const membershipBeginAction = () => {
    return {
        type: actionTypes.BeginAction
    };
}

export const membershipRejectAction = (error) => {
    return {
        type: actionTypes.RejectAction,
        error: error
    }
}