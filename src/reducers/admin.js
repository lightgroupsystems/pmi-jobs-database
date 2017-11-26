import actionTypes from '../constants/adminTypes';

const initialState =
    {
        users: {}
    };

export default function admin(state = initialState, action) {
    if (action.payload) {
        var users = {...state.users};
        var ID = action.payload.key;
        var object = action.payload.val;
    }
    switch (action.type) {
        case actionTypes.UserAdded:
        case actionTypes.UserChanged:
            object.userID = ID;
            if(users[ID] && users[ID].clearances){
                console.log("Clearances created before");
                object.clearances = users[ID].clearances;
            }
            users[ID] = object;
            return { ...state, users };
        case actionTypes.UserRemoved:
            delete users[ID];
            return { ...state, users };

        case actionTypes.ClearanceAdded:
        case actionTypes.ClearanceChanged:
            users[ID] = {...users[ID], clearances:object};
            return { ...state, users };
        case actionTypes.ClearanceRemoved:
            delete users[ID].clearances;
            return { ...state, users };
        default:
            return state;
    }
}
