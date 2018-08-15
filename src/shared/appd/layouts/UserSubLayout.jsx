import React from 'react'
import { Switch, Route, NavLink } from 'react-router-dom';
import UserNav from '../components/Common/UserNav';

// Sub Layouts
import BrowseUsersPage from '../pages/User/BrowseUsersPage'
import AddUserPage from '../pages/User/AddUserPage'
import UserProfilePage from '../pages/User/UserProfilePage'

const UserSubLayout = ({ match }) => (
  <div className="user-sub-layout">
    <aside>
      <UserNav />
    </aside>
    <div className="primary-content">
      <Switch>
        <Route path={match.path} exact component={BrowseUsersPage} />
        <Route path={`${match.path}/add`} exact component={AddUserPage} />
        <Route path={`${match.path}/:userId`} component={UserProfilePage} />
      </Switch>
    </div>
  </div>
)

export default UserSubLayout