import React, {Component} from 'react';
import PropTypes from "prop-types";
import { SelectField } from 'react-md/lib/SelectFields';

class ToolbarTitleMenu extends Component {
    handleChange = (value, index) => {
        if (this.props.onChange)
            this.props.onChange({ value, index });
    };

    render() {
        const props = this.props;

        return (
            <SelectField {...props} onChange={this.handleChange} listStyle={{overflow:"hidden"}} position={SelectField.Positions.BELOW}/>
        );
    }
}

ToolbarTitleMenu.propTypes = {
    id: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    menuItems: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
    })),
    onChange: PropTypes.func,
    // Injected by the Toolbar component
    className: PropTypes.string,
    toolbar: PropTypes.bool,
    position: PropTypes.string,
};

export default ToolbarTitleMenu;