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
import FontIcon from 'react-md/lib/FontIcons';

import logo from '../images/pmi-logo.svg';
import LinearLoading from '../components/LinearLoading';

const fieldsValidator = {
    name: (value, currentState) => !validator.isEmpty(value),
    memberID: (value, currentState) => !validator.isEmpty(value),
    email: (value, currentState) => validator.isEmail(value),
    password: (value, currentState) => !validator.isEmpty(value),
    passwordConfirm: (value, currentState) => !validator.isEmpty(value),
    companyName: (value, currentState) => !validator.isEmpty(value),
}

class Register extends Component {

    constructor() {
        super();

        this.state = {
            name: "",
            nameValid: true,
            memberID: "",
            memberIDValid: true,
            companyName: "",
            companyNameValid: true,
            email: "",
            emailValid: true,
            password: "",
            passwordValid: true,
            passwordConfirm: "",
            passwordConfirmValid: true,
            passwordMatch: true,

            userType: "member" // TODO: member or company
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeMemberID = this.handleChangeMemberID.bind(this);
    }

    handleSubmit(event) {
        if (event)
            event.preventDefault();


        let registerUser = { name: this.state.name, memberID: this.state.memberID, email: this.state.email, password: this.state.password, userType: this.state.userType };

        if (this.state.userType === "company")
            registerUser = { name: this.state.name, companyName: this.state.companyName, email: this.state.email, password: this.state.password, userType: this.state.userType };

        this.props.register(registerUser);
    }

    handleFieldChange = fieldName => value => this.setState({ [fieldName]: value, [`${fieldName}Valid`]: fieldsValidator[fieldName](value, this.state) }, this.validateForm);

    handleChangeMemberID(value) {
        let resultValue = validator.whitelist(value, '0123456789');
        this.setState({ memberID: resultValue, memberIDValid: fieldsValidator.memberID(resultValue, this.state) }, this.validateForm);
    }

    validateForm() {
        let nameValid = fieldsValidator.name(this.state.name, this.state);
        let memberIDValid = fieldsValidator.memberID(this.state.memberID, this.state);
        let emailValid = fieldsValidator.email(this.state.email, this.state);
        let passwordValid = fieldsValidator.password(this.state.password, this.state);
        let passwordConfirmValid = fieldsValidator.passwordConfirm(this.state.passwordConfirm, this.state);
        let companyNameValid = fieldsValidator.companyName(this.state.companyName, this.state);
        let passwordMatch = this.state.password === this.state.passwordConfirm;

        let isMemberOrCompanyValid = this.state.userType === "member" ? memberIDValid : companyNameValid;

        let allValid = nameValid && isMemberOrCompanyValid && emailValid && passwordValid && passwordConfirmValid && passwordMatch;

        this.setState({ allValid, passwordMatch });
    }

    handleUserTypeChange = (userType) => () => this.setState({ userType });

    render() {

        let isLoading = this.props.isLoading;

        return (
            <FocusContainer focusOnMount component="form" className="md-grid" onSubmit={this.handleSubmit} aria-labelledby="container-register-form">
                <div className="md-cell md-cell--12">
                    <div className="md-block-centered" style={{maxWidth:400, padding:30}}>
                        <img src={logo} alt="logo" />
                    </div>
                    <Card className="md-block-centered" style={{maxWidth:500}}>
                        <CardTitle className="md-background--primary" title="Register"  />
                        <LinearLoading id="register-loading" isLoading={isLoading}/>
                        <CardText className="md-grid">
                            <Button raised primary iconEl={<FontIcon>person</FontIcon>} disabled={this.state.userType === "member"} onClick={this.handleUserTypeChange("member")}>Member</Button>&nbsp;&nbsp;
                            <Button raised primary iconEl={<FontIcon>business</FontIcon>} disabled={this.state.userType === "company"} onClick={this.handleUserTypeChange("company")}>Company</Button>
                        </CardText>
                        <CardText className="md-grid">
                            <TextField
                                id="name"
                                label="Name"
                                onChange={this.handleFieldChange("name")}
                                value={this.state.name}
                                error={!this.state.nameValid}
                                lineDirection="center"
                                placeholder=""
                                className="md-cell md-cell--6"
                                floating={true}
                                required
                            />
                            {this.state.userType === "member" && <TextField
                                id="pmiMemberID"
                                label="Member ID"
                                type="tel"
                                onChange={this.handleChangeMemberID}
                                value={this.state.memberID}
                                error={!this.state.memberIDValid}
                                lineDirection="center"
                                placeholder=""
                                className="md-cell md-cell--6"
                                floating={true}
                                required
                            />}
                            {this.state.userType === "company" && <TextField
                                id="companyName"
                                label="Company Name"
                                type="tel"
                                onChange={this.handleFieldChange("companyName")}
                                value={this.state.companyName}
                                error={!this.state.companyNameValid}
                                lineDirection="center"
                                placeholder=""
                                className="md-cell md-cell--6"
                                floating={true}
                                required
                            />}
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
                                className="md-cell md-cell--6 md-rig"
                                required
                            />
                            <TextField
                                id="passwordConfirm"
                                label="Confirm Password"
                                type="password"
                                value={this.state.passwordConfirm}
                                error={!(this.state.passwordConfirmValid && this.state.passwordMatch)}
                                errorText={this.state.passwordMatch ? "" : "Passwords must match"}
                                onChange={this.handleFieldChange("passwordConfirm")}
                                lineDirection="center"
                                placeholder=""
                                floating={true}
                                className="md-cell md-cell--6 md-rig"
                                required
                            />
                        </CardText>
                        <CardActions>
                            <Button href="/signin" flat disabled={isLoading} className="md-text-center" component={RouterLink} to="/signin">Sign In</Button>
                            <Button type="submit" primary raised className="md-cell--right" disabled={isLoading || !this.state.allValid}>Save</Button>
                        </CardActions>
                    </Card>
                </div>
            </FocusContainer>
        );
    }
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
};

export default Register;