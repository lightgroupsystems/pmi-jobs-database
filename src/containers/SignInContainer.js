import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signIn} from '../actions/membership/signIn';
import SignIn from '../views/SignIn';

const mapStateToProps = (state) => {
    return ({
        isLoading: state.membership.isLoading
    });
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        signIn
    }, dispatch)
}

const SignInContainer = connect(mapStateToProps, mapDispatchToProps)(SignIn)

export default SignInContainer