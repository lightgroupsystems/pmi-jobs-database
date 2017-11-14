import actionTypes from '../constants/profileTypes';

const initialState =
{
    users:[]
};

export default function admin(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ProfileInfoChanged:
            return {...state, users: action.payload};
        default:
            return state;
    }
}
