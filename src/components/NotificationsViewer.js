import React, {Component} from 'react';
import PropTypes from "prop-types";
import Snackbar from 'react-md/lib/Snackbars';

class NotificationsViewer extends Component {

    handleDismiss = () => {
        if (this.props.onDismiss)
            this.props.onDismiss();
    };

    render() {

        let messages = this.props.messages;

        return (
            <Snackbar
                id="notifications-snackbar"
                toasts={messages}
                autohide={true}
                onDismiss={this.handleDismiss}
            />
        );
    }
}

NotificationsViewer.propTypes = {
    messages: PropTypes.array,
    onDismiss: PropTypes.func,
};

NotificationsViewer.defaultProps = {
    messages: []
};

export default NotificationsViewer;