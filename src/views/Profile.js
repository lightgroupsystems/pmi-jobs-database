import React, { Component } from 'react';
import PropTypes from "prop-types";
import UserCard from "../containers/UserCardContainer";

class Profile extends Component {

    componentWillMount() {
        this.props.watchProfile();
    }

    componentWillUnmount() {
        this.props.offWatchProfile();
    }
    render() {
        const {email, memberID, name, resume, resumeDate} = this.props.user;
        const isLoading = this.props.isLoading;
        return (<UserCard id='user-card' userID={this.props.userID} name={name} isLoading={isLoading} email={email} resume={resume} resumeDate={resumeDate} showDropArea={true} memberID={memberID}/>);
    }
}

Profile.propTypes = {
    userID: PropTypes.string.isRequired,
    user: PropTypes.any,
    isLoading: PropTypes.bool,
    watchProfile: PropTypes.func.isRequired,
    offWatchProfile: PropTypes.func.isRequired
};

export default Profile;
