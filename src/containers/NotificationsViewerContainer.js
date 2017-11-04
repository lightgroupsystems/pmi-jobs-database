import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {dismissNotification} from "../actions/notifications";
import NotificationsViewer from '../components/NotificationsViewer';

const mapStateToProps = (state) => {
    return ({
        messages: state.notifications.messages
    });
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onDismiss: dismissNotification
    }, dispatch)
}

const NotificationsViewerContainer = connect(mapStateToProps, mapDispatchToProps)(NotificationsViewer)

export default NotificationsViewerContainer