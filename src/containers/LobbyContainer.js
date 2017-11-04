import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {signOut} from '../actions/membership/signOut';
import {refreshUserInfo} from '../actions/membership/watchMembership';
import Lobby from '../views/Lobby';

const mapStateToProps = (state) => {
    return ({
        isLoading: state.membership.isLoading,
        isAuthenticated: state.membership.isAuthenticated,
        isAuthorized: state.membership.isAuthorized,
        currentUser: state.membership.currentUser
    });
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        signOut,
        refreshUserInfo
    }, dispatch)
}

const LobbyContainer = connect(mapStateToProps, mapDispatchToProps)(Lobby)

export default LobbyContainer