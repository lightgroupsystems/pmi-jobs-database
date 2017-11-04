import {connect} from 'react-redux';
import { withRouter } from 'react-router'
import {bindActionCreators} from 'redux';
import {watchAuth} from './actions/membership/watchMembership';
import {signOut} from './actions/membership/signOut';
import App from './App';

const mapStateToProps = (state) => {
    return ({
        isAuthorized: state.membership.isAuthorized,
        isAuthenticated: state.membership.isAuthenticated,
        clearances: state.membership.clearances,
    });
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        watchAuth,
        signOut
    }, dispatch)
}

const AppContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

export default AppContainer