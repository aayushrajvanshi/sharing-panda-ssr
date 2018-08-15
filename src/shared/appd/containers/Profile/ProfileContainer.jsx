import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ViewProfile from 'Components/Profile/ViewProfile';

class ProfileContainer extends Component {
    render() {
        return (
            <div>
                <Route path="/profile" component={ViewProfile} />
            </div>
        );
    }
}

export default ProfileContainer;