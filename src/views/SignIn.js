import React, { Component } from 'react';
import PropTypes from "prop-types";
import Button from "react-md/lib/Buttons/Button";
import CardActions from "react-md/lib/Cards/CardActions";
import CardText from "react-md/lib/Cards/CardText";
import CardTitle from "react-md/lib/Cards/CardTitle";
import Card from "react-md/lib/Cards/Card";
import TextField from "react-md/lib/TextFields/TextField";
import FocusContainer from 'react-md/lib/Helpers/FocusContainer';
import validator from 'validator';
import { Link as RouterLink } from 'react-router-dom';

import logo from '../images/pmi-logo.svg';
import LinearLoading from '../components/LinearLoading';

class SignIn extends Component {

    constructor() {
        super();

        this.state = {
            email: "",
            emailValid: true,
            password: "",
            passwordValid: true
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        if (event)
            event.preventDefault();

        this.props.signIn(this.state.email, this.state.password);
    }

    handleFieldChange = fieldName => value => this.setState({ [fieldName]: value }, this.validateForm);

    validateForm() {
        let emailValid = validator.isEmail(this.state.email);

        let passwordValid = !validator.isEmpty(this.state.password)

        let allValid = emailValid && passwordValid;

        this.setState({ emailValid, passwordValid, allValid });
    }

    render() {

        let isLoading = this.props.isLoading;

        return (
            <FocusContainer focusOnMount component="form" className="md-grid" onSubmit={this.handleSubmit} aria-labelledby="container-signin-form">
                <div className="md-cell md-cell--12">
                    <div className="md-block-centered" style={{maxWidth:400, padding:30}}>
                        <img src={logo} alt="logo" />
                    </div>
                    <Card className="md-block-centered" style={{maxWidth:500}}>
                        <CardTitle className="md-background--primary" title="Sign in"  />
                        <LinearLoading id="signin-loading" isLoading={isLoading}/>
                        <CardText className="md-grid">
                            <TextField
                                id="email"
                                label="Email"
                                value={this.state.email}
                                error={!this.state.emailValid}
                                onChange={this.handleFieldChange("email")}
                                lineDirection="center"
                                placeholder=""
                                className="md-cell md-cell--6"
                                floating={true}
                                required
                            />
                            <TextField
                                id="password"
                                label="Password"
                                type="password"
                                value={this.state.password}
                                error={!this.state.passwordValid}
                                onChange={this.handleFieldChange("password")}
                                lineDirection="center"
                                placeholder=""
                                floating={true}
                                className="md-cell md-cell--6"
                                required
                            />
                        </CardText>
                        <CardActions>
                            <Button flat disabled={isLoading} className="md-text-center" component={RouterLink} to="/register">Register</Button>
                            <Button type="submit" primary raised className="md-cell--right" disabled={isLoading || !this.state.allValid}>Sign in</Button>
                        </CardActions>
                    </Card>
                    <div className="md-block-centered" style={{maxWidth:400, padding:30}}>
                        <Button flat disabled={isLoading} className="md-block-centered md-text-center" component={RouterLink} to="/recovery">Forgot password?</Button>
                    </div>
                </div>
            </FocusContainer>
        );
    }
}

SignIn.propTypes = {
    signIn: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
};

export default SignIn;
