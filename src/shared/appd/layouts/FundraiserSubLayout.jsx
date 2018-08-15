import React from 'react'
import { Switch, Route, NavLink } from 'react-router-dom';
import FundraiserNav from '../components/Common/FundraiserNav';

// Sub Layouts
import BrowseFundraiserPage from '../pages/Fundraiser/BrowseFundraiserPage';
import AddFundraiserPage from '../pages/Fundraiser/AddFundraiserPage';
import FundraiserDetailPage from '../pages/Fundraiser/FundraiserDetailPage';

const FundraiserSubLayout = ({ match }) => (
  <div className="fundraiser-sub-layout">
    <aside>
      <FundraiserNav />
    </aside>
    <div className="primary-content">
      <Switch>
        <Route path={match.path} exact component={BrowseFundraiserPage} />
        <Route path={`${match.path}/add`} exact component={AddFundraiserPage} />
        <Route path={`${match.path}/:fundraiserId`} component={FundraiserDetailPage} />
      </Switch>
    </div>
  </div>
)

export default FundraiserSubLayout