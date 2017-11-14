import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import UserCard from '../components/UserCard';
import {uploadResume} from "../actions/uploadResume";
import {sendNotification} from "../actions/notifications";

const mapStateToProps = (state) => {
    return ({
    });
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      uploadResume,
      sendNotification
    }, dispatch)
}

const UserCardContainer = connect(mapStateToProps, mapDispatchToProps)(UserCard)

export default UserCardContainer
