import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {recoverPassword} from "../actions/membership/recoverPassword";
import Recovery from '../views/Recovery';

const mapStateToProps = (state) => {
    return ({
        isLoading: state.membership.isLoading
    });
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        recoverPassword
    }, dispatch)
}

const RecoveryContainer = connect(mapStateToProps, mapDispatchToProps)(Recovery)

export default RecoveryContainer