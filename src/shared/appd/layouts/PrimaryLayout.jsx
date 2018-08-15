import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

//Components
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';

//Pages
import AppHomePage from '../pages/AppHomePage';

//Sub Layouts 
import UserSubLayout from '../layouts/UserSubLayout';
import FundraiserSubLayout from '../layouts/FundraiserSubLayout';

const PrimaryLayout = ({ match }) => (
    <div className="primary-layout">
        <Header />
        <main>
            <Switch>
                <Route path='/' exact component={AppHomePage} />
                <Route path='/users' component={UserSubLayout} />
                <Route path='/fundraisers' component={FundraiserSubLayout} />
                <Redirect to={`${match.url}`} />
            </Switch>
        </main>
        <Footer />
    </div>
)

export default PrimaryLayout