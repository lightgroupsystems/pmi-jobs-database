import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {offWatchJobs, watchJobs} from "../actions/admin/watchJobs";
import {offWatchUsers, watchUsers} from "../actions/admin/watchUsers";
import Admin from '../views/Admin';

const mapStateToProps = (state) => {
    return ({
      currentMenuSelected: "users",
      users: state.admin.users
    });
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        offWatchJobs,
        watchJobs,
        offWatchUsers,
        watchUsers
    }, dispatch)
}

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Admin)

export default ProfileContainer
