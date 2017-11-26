import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import UserCard from '../components/UserCard';
import {uploadResume} from "../actions/uploadResume";
import {sendNotification} from "../actions/notifications";

const mapStateToProps = (state) => {
    return ({
      isLoading: state.membership.isLoading
    });
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      uploadResume,
      sendNotification,
      dispatch
    }, dispatch)
}

const UserCardContainer = connect(mapStateToProps, mapDispatchToProps)(UserCard)

export default UserCardContainer
