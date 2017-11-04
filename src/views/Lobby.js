import React, {Component} from 'react';
import PropTypes from "prop-types";
import { Card, CardTitle, CardText, CardActions, Button, Chip } from 'react-md';
import FontIcon from 'react-md/lib/FontIcons';

import logo from '../images/pmi-logo.svg';
import LinearLoading from '../components/LinearLoading';

class Lobby extends Component {

    constructor() {
        super();

        this.handleSignOut = this.handleSignOut.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
    }

    handleSignOut() {
        this.props.signOut();
    }

    handleRefresh() {
        this.props.refreshUserInfo();
    }

    renderMessage() {
        if (!this.props.currentUser)
            return;

        if (!this.props.currentUser.emailVerified)
        {
            let email = this.props.currentUser.email;

            return (
                <div>
                    <p><Chip label={`Confirm your Email: ${email}`} /></p>
                    <p>Please check your inbox for a confirmation email and click the link in the email to confirm your email address.</p>
                </div>
            )
        }
        else if (!this.props.isAuthorized)
        {
            let name = this.props.currentUser.name;

            return (
                <div>
                    <p><Chip label={`Pending for approval: ${name}`} /></p>
                    <p>We are working to verify your information. You will be noticed by email when we are finish.</p>
                </div>
            )
        }

    }

    render() {
        let isLoading = this.props.isLoading || !this.props.currentUser;

        // let resendEmailDisabled = isLoading || this.props.currentUser.emailVerified;

        return (
            <div className="md-grid">
                <div className="md-cell md-cell--12">
                    <div className="md-block-centered" style={{maxWidth:400, padding:30}}>
                        <img src={logo} alt="logo" />
                    </div>
                    <Card className="md-block-centered" style={{maxWidth:500}}>
                        <CardTitle className="md-background--primary" title="Lobby">
                            <Button icon tooltipLabel="Refresh" className="md-cell--right" tooltipPosition="left" disabled={isLoading} onClick={this.handleRefresh}>
                                <FontIcon style={{color: '#fff'}}>update</FontIcon>
                            </Button>
                        </CardTitle>
                        <LinearLoading id="signin-loading" isLoading={isLoading}/>
                        <CardText className="md-grid">
                            {this.renderMessage()}
                        </CardText>
                        <CardActions>
                            <Button label="Sign out" flat disabled={isLoading} onClick={this.handleSignOut} />
                            {/*<Button label="Resend your confirmation email" primary raised className="md-cell--right" disabled={resendEmailDisabled} />*/}
                        </CardActions>
                    </Card>
                </div>
            </div>
        );
    }
}

Lobby.propTypes = {
    isLoading: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    isAuthorized: PropTypes.bool,
    currentUser: PropTypes.any,
    signOut: PropTypes.func.isRequired,
    refreshUserInfo: PropTypes.func.isRequired
};

export default Lobby;