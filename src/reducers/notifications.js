import actionTypes from '../constants/notificationTypes';

const initialState =
{
    messages: []
};

export default function notifications(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SendNotification:
            const messagesForSend = addMessage(state.messages, action.payload.message);

            return { ...state, messages: messagesForSend };
        case actionTypes.DismissNotification:
            const messagesForDismiss = removeFirstMessage(state.messages);

            return { ...state, messages: messagesForDismiss };
        default:
            return state;
    }
}

function addMessage(messages, text) {
    const result = messages.slice(); // copy array
    // const action = "Close";
    // result.push({ text, action });
    result.push({ text });
    return result;
}

function removeFirstMessage(messages) {
    const result = messages.slice(); // copy array
    result.shift(); // remove the first message
    return result;
}