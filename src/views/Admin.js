import React, { Component } from 'react';
import FontIcon from 'react-md/lib/FontIcons';
import PropTypes from "prop-types";
import { Toolbar } from 'react-md/lib/Toolbars';
import ToolbarTitleMenu from "../components/ToolbarTitleMenu";
import UserCard from "../containers/UserCardContainer";

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

  mountWatch(value) {
    switch (value) {
      case "jobs":
        this.props.watchJobs();
        break;
      case "users":
      default:
        this.props.watchUsers();
        break;
    }
  }


  unmountWatch(value) {
    switch (value) {
      case "jobs":
        this.props.offWatchJobs();
        break;
      case "users":
      default:
        this.props.offWatchUsers();
        break;
    }
  }

  componentWillUnmount() {
    this.unmountWatch(this.props.currentMenuSelected);
  }

  componentWillMount() {
    this.mountWatch(this.props.currentMenuSelected);
  }

  handleMenuChange = ({ value, index }) => {
    this.unmountWatch(this.props.currentMenuSelected);
    this.mountWatch(value);
    this.setState({ currentMenuSelected: value });
  };

  render() {
    var content;
    switch (this.props.currentMenuSelected) {
      case "users":
        var userComponents = [];
        var i = 1;
        for (var userID in this.props.users) {
          var user = this.props.users[userID];
          userComponents.push(
            <UserCard key={i} showDropArea={false} user={user} />
          );
          i++;
        }
        content = <div className="md-grid">
          {userComponents}
        </div>;
        break;
      case "jobs":
        content = <h3>JOBS!</h3>;
        break;
      default:
        content = <h3>something went wrong</h3>;
    }

    return (
      <div>
        <Toolbar
          themed
          titleMenu={<ToolbarTitleMenu id="toolbar-admin-menu" defaultValue={"users"} menuItems={menuItems} onChange={this.handleMenuChange} />}>
        </Toolbar>
        {content}
      </div>

    );
  }
}

Admin.propTypes = {
  users: PropTypes.any,
  watchUsers: PropTypes.func.isRequired,
  offWatchUsers: PropTypes.func.isRequired,
  watchJobs: PropTypes.func.isRequired,
  offWatchJobs: PropTypes.func.isRequired,
  currentMenuSelected: PropTypes.string.isRequired
};

export default Admin;
