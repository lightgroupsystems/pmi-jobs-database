import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {offWatchProfile, watchProfile} from "../actions/watchProfile";
import Profile from '../views/Profile';

const mapStateToProps = (state) => {
    console.log(state.membership);
    return ({
        userID: state.membership.currentUserID,
        user: state.profile.user,
        isLoading: state.resumes.isLoading
    });
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        watchProfile,
        offWatchProfile
    }, dispatch)
}

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile)

export default ProfileContainer
