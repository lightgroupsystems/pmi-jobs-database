import actionTypes from '../constants/adminTypes';

const initialState =
{
    users:[]
};

export default function admin(state = initialState, action) {
    switch (action.type) {
        case actionTypes.UsersChanged:
            return {...state, users: action.payload};
        default:
            return state;
    }
}
