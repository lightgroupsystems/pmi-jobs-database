import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {offWatchProfile, watchProfile} from "../actions/watchProfile";
import {uploadResume} from "../actions/uploadResume";
import {sendNotification} from "../actions/notifications";
import Profile from '../views/Profile';

const mapStateToProps = (state) => {
    return ({
        user: state.profile.user,
        isLoading: state.resumes.isLoading
    });
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        watchProfile,
        offWatchProfile,
        uploadResume,
        sendNotification
    }, dispatch)
}

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile)

export default ProfileContainer