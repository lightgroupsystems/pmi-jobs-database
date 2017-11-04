import actionTypes from '../constants/notificationTypes'

export const sendNotification = (message) => ({
    type: actionTypes.SendNotification,
    payload: {
        message : message
    }
})

export const dismissNotification = () => ({
    type: actionTypes.DismissNotification
})