import React from 'react';
import {Route, Switch} from "react-router-dom";
import {connect, useSelector} from "react-redux";
import PropTypes from 'prop-types';
import routes, {AccountsSubMenu, AdminSettingsSubMenu, ReportingSubMenu} from "./routes";
import NoMatch from "../../screens/NoMatch";
import OldSchoolMenuLink from "../../components/OldSchoolMenuLink/OldSchoolMenuLink";
import MenuItemHasChildren from "../../components/MenuItemHasChildren";
import LinkCount from "../../components/LinkCount";
import chats from "../../screens/MessagesScreen/chats";
import {isAdmin} from "../../utils/helpers/responce-helpers";

const AppNavigation = props => {
    const {hideNavBar, authRole} = props;
    const eventListingCount = useSelector(state => state.orders.fetchedOrders.length);

    return (
        <main>
            <div className='app-nav'>
                <div className="container-fluid">
                    <div className={`row grid-xxl ${hideNavBar && 'd-block'}`}>
                        <div className={`col-12 col-lg-3 p-0 ${hideNavBar && 'd-none'}`}>
                            <nav className="main-nav">
                                <ul>
                                    <li>
                                        <OldSchoolMenuLink
                                            activeOnlyWhenExact={true} to="/"
                                            label="Dashboard"/>
                                    </li>
                                    <li>
                                        <OldSchoolMenuLink
                                            to="/messages"
                                            label={<LinkCount name="Messages" count={chats.length}/>}/>
                                    </li>
                                    <li>
                                        <OldSchoolMenuLink
                                            to="/event-listing"
                                            label={<LinkCount name="Event listing" count={eventListingCount}/>}/>
                                    </li>
                                    <MenuItemHasChildren label="Accounts"
                                                         subMenu={AccountsSubMenu}/>
                                    {isAdmin(authRole) && (
                                        <MenuItemHasChildren label="Admin settings" subMenu={AdminSettingsSubMenu}/>
                                    )}
                                    <MenuItemHasChildren label="Reporting"
                                                         subMenu={ReportingSubMenu}/>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-12 col-lg-9 pr-0 pl-0 mb-3 static">
                            <Switch>
                                {routes.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        children={route.component}
                                    />
                                ))}
                                <Route path="*">
                                    <NoMatch/>
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

AppNavigation.propTypes = {
    authRole: PropTypes.string,
    hideNavBar: PropTypes.bool
}

const mapStateToProps = state => {
    return {
        authRole: state.login.role,
        hideNavBar: state.app.hideNavBar
    }
}

export default connect(mapStateToProps)(AppNavigation);



