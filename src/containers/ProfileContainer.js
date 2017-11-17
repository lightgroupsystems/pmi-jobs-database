import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {offWatchProfile, watchProfile} from "../actions/watchProfile";
import Profile from '../views/Profile';

const mapStateToProps = (state) => {
    state.profile.user.userID = state.membership.currentUserID;
    return ({
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
