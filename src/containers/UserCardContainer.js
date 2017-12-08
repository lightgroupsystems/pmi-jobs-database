import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import UserCard from '../components/UserCard';
import {uploadResume} from "../actions/uploadResume";
import {sendNotification} from "../actions/notifications";
import {isAdminChanged, isMemberChanged, isCompanyChanged, isUserDeleted} from "../actions/admin/watchUsers"

const mapStateToProps = (state) => {
    return ({
      isLoading: state.membership.isLoading
    });
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      uploadResume,
      sendNotification,
      isAdminChanged,
      isMemberChanged,
      isCompanyChanged,
      isUserDeleted,
      dispatch
    }, dispatch)
}

const UserCardContainer = connect(mapStateToProps, mapDispatchToProps)(UserCard)

export default UserCardContainer
