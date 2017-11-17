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
        return (<UserCard id='user-card' showDropArea={true} user={this.props.user}/>);
    }
}

Profile.propTypes = {
    user: PropTypes.any,
    isLoading: PropTypes.bool,
    watchProfile: PropTypes.func.isRequired,
    offWatchProfile: PropTypes.func.isRequired
};

export default Profile;
