import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {register} from "../actions/membership/register";
import Register from '../views/Register';

const mapStateToProps = (state) => {
    return ({
        isLoading: state.membership.isLoading
    });
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        register
    }, dispatch)
}

const RegisterContainer = connect(mapStateToProps, mapDispatchToProps)(Register)

export default RegisterContainer