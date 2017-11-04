import React, { Component } from 'react';
import FontIcon from 'react-md/lib/FontIcons';
import { Toolbar } from 'react-md/lib/Toolbars';
import ToolbarTitleMenu from "../components/ToolbarTitleMenu";

const menuItems = [{
    label: 'Users',
    value: 'users',
    icon: <FontIcon>assignment_ind</FontIcon>
}, {
    label: 'Jobs',
    value: 'jobs',
    icon: <FontIcon>assignment</FontIcon>
}];

class Admin extends Component {

    constructor() {
        super();

        this.state = {
            currentMenuSelected: "users"
        }
    }

    handleMenuChange = ({ value, index }) => {
        this.setState({ currentMenuSelected: value });
    };

    render() {
        console.log("selected: " + this.state.currentMenuSelected)

        return (
            <div>
                <Toolbar
                    themed
                    titleMenu={<ToolbarTitleMenu id="toolbar-admin-menu" defaultValue={"users"} menuItems={menuItems} onChange={this.handleMenuChange} />}
                />
            </div>

        );
    }
}

Admin.propTypes = {
    //mobile: PropTypes.bool.isRequired,
};

export default Admin;
