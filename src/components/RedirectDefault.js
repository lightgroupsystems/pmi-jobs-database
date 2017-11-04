import React, {Component} from 'react';
import PropTypes from "prop-types";
import { Redirect } from 'react-router';

class RedirectDefault extends Component {
    constructor() {
        super();

        this.wasRedirected = false;
    }

    render() {
        if (!this.wasRedirected)
        {
            this.wasRedirected = true;
            return <Redirect to={this.props.to}/>
        }

        return <div/>
    }
}

RedirectDefault.propTypes = {
    to: PropTypes.string.isRequired
};

export default RedirectDefault;