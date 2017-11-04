import React, {Component} from 'react';
import PropTypes from "prop-types";
import Button from "react-md/lib/Buttons/Button";
import CardActions from "react-md/lib/Cards/CardActions";
import CardText from "react-md/lib/Cards/CardText";
import CardTitle from "react-md/lib/Cards/CardTitle";
import Card from "react-md/lib/Cards/Card";
import TextField from "react-md/lib/TextFields/TextField";
import { Link as RouterLink } from 'react-router-dom';
import FocusContainer from 'react-md/lib/Helpers/FocusContainer';
import validator from 'validator';

import logo from '../images/pmi-logo.svg';
import LinearLoading from '../components/LinearLoading';

class Recovery extends Component {

    constructor() {
        super();

        this.state = {
            email: "",
            emailValid: true,
            emailSended: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        if (event)
            event.preventDefault();

        this.setState({ emailSended: true });
        this.props.recoverPassword(this.state.email);
    }

    handleFieldChange = fieldName => value => this.setState({ [fieldName]: value }, this.validateForm);

    validateForm() {
        let emailValid = validator.isEmail(this.state.email);

        let allValid = emailValid;

        this.setState({ emailValid, allValid });
    }

    render() {
        let isLoading = this.props.isLoading;

        let disabledSubmit = isLoading || !this.state.allValid || (this.state.emailSended && !isLoading);

        return (
            <FocusContainer focusOnMount component="form" className="md-grid" onSubmit={this.handleSubmit} aria-labelledby="container-register-form">
                <div className="md-cell md-cell--12">
                    <div className="md-block-centered" style={{maxWidth:400, padding:30}}>
                        <img src={logo} alt="logo" />
                    </div>
                    <Card className="md-block-centered" style={{maxWidth:500}}>
                        <CardTitle className="md-background--primary" title="Forgot password?" />
                        <LinearLoading id="signin-loading" isLoading={isLoading}/>
                        <CardText className="md-grid">
                            {!this.state.emailSended &&
                                <TextField
                                    id="email"
                                    label="Email"
                                    onChange={this.handleFieldChange("email")}
                                    value={this.state.email}
                                    error={!this.state.emailValid}
                                    lineDirection="center"
                                    placeholder=""
                                    className="md-cell md-cell--12"
                                    floating={true}
                                    required
                                />
                            }
                            {this.state.emailSended &&
                                <p>Please check your inbox for a recovery email and click the link in the email in order to set a new password.</p>
                            }
                        </CardText>
                        <CardActions>
                            <Button href="/signin" flat disabled={isLoading} className="md-text-center" component={RouterLink} to="/signin">Sign In</Button>
                            <Button type="submit" primary raised className="md-cell--right" disabled={disabledSubmit}>Recover</Button>
                        </CardActions>
                    </Card>
                </div>
            </FocusContainer>
        );
    }
}

Recovery.propTypes = {
    isLoading: PropTypes.bool,
    recoverPassword: PropTypes.func.isRequired
};

export default Recovery;