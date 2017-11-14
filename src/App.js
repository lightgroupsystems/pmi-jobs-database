import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import ListItem from 'react-md/lib/Lists/ListItem';
import MenuButton from 'react-md/lib/Menus/MenuButton';
import NavLink from './components/NavLink';
import { Link as RouterLink } from 'react-router-dom';

import logo from './images/pmi-logo.svg';
import Profile from './containers/ProfileContainer';
import SignIn from './containers/SignInContainer';
import Register from './containers/RegisterContainer';
import NotificationsViewer from "./containers/NotificationsViewerContainer";
import Admin from './containers/AdminContainer';
import Lobby from "./containers/LobbyContainer";
import Recovery from "./containers/RecoveryContainer";
import Help from "./views/Help";
import Jobs from "./views/Jobs";
import Toolbar from "react-md/lib/Toolbars/Toolbar";
import RedirectDefault from "./components/RedirectDefault";

const navItems = [
    {
        exact: true,
        label: 'Profile',
        to: '/',
        icon: 'account_circle',
        clearances: {
            isAdmin: true,
            isMember: true,
        }
    },
    {
        exact: true,
        label: 'Jobs',
        to: '/jobs',
        icon: 'work',
        clearances: {
            isAdmin: true,
            isMember: true,
        }
    },
    {
        exact: true,
        label: 'Admin',
        to: '/admin',
        icon: 'settings',
        clearances: {
            isAdmin: true,
            isMember: false,
        }
    }
];

class App extends Component {

    constructor() {
        super();

        this.handleSignOut = this.handleSignOut.bind(this);
    }

    componentWillMount() {
        this.props.watchAuth();
    }

    handleSignOut() {
        this.props.signOut();
    }

    renderLogo() {
        return (
            <Toolbar className="md-divider-border md-divider-border--bottom" style={{height: 87}}>
                <img src={logo} alt="logo" style={{height:"100%", margin: "0 auto", padding: "2px"}}/>
            </Toolbar>
        )
    }

    renderUserMenu() {
        return (
            <MenuButton key="user-menu" id="user-menu" icon menuItems={[
                <ListItem key={1} primaryText="Help" component={RouterLink} to="/help" />,
                <ListItem key={2} primaryText="Sign out" onClick={this.handleSignOut} />
            ]}>
                more_vert
            </MenuButton>
        );
    }

    renderApp(location) {
        let isAuthenticated = this.props.isAuthenticated;
        let isAuthorized = this.props.isAuthorized;

        if (isAuthenticated && isAuthorized)
        {
            const userClearances = this.props.clearances;
            let navResult = [];
            if (userClearances)
                navResult = navItems
                    .filter(x => x.clearances.isAdmin === userClearances.isAdmin ||
                                 x.clearances.isMember === userClearances.isMember);

            return (
                <NavigationDrawer
                    drawerHeader={this.renderLogo()}
                    toolbarTitle="Jobs Database"
                    navItems={navResult.map(props => <NavLink {...props} key={props.to} />)}
                    toolbarActions={[this.renderUserMenu()]}
                >
                    <Switch key={location.key} location={location}>
                        <Route exact path="/" component={Profile} />
                        <Route exact path="/jobs" component={Jobs} />
                        <Route exact path="/help" component={Help} />
                        <Route exact path="/admin" component={Admin} />
                        <RedirectDefault to="/" />
                    </Switch>
                </NavigationDrawer>
            )
        }
        else if (isAuthenticated && !isAuthorized)
        {
            return (
                <Switch key={location.key} location={location}>
                    <Route exact path="/lobby" component={Lobby} />
                    <RedirectDefault to="/lobby" />
                </Switch>
            )
        }
        else
        {
            return (
                <Switch key={location.key} location={location}>
                    <Route exact path="/signin" component={SignIn} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/recovery" component={Recovery} />
                    <RedirectDefault to="/signin" />
                </Switch>
            )
        }
    }
    render() {
        return (
            <Route
                render={({ location }) => (
                    <div>
                        <NotificationsViewer/>

                        {this.renderApp(location)}
                    </div>
                )}
            />
        );

    }
}

App.propTypes = {
    watchAuth: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    isAuthorized: PropTypes.bool,
    clearances: PropTypes.any
};

export default App;
