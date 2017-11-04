import React, { Component } from 'react';
import PropTypes from "prop-types";
import LinearProgress from 'react-md/lib/Progress/LinearProgress';

class LinearLoading extends Component {
    render() {
        let visibility = this.props.isLoading ? "" : "hidden";

        return (
            <LinearProgress key={this.props.id} id={this.props.id} style={{margin:0, visibility:visibility}} />
        );
    }
}

LinearLoading.propTypes = {
    id: PropTypes.string.isRequired,
    isLoading: PropTypes.bool
};

export default LinearLoading;