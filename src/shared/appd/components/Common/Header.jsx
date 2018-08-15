import React from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import img1 from '../../../public/assets/images/img1.jpg';

const PrimaryHeader = ({ match }) => (
    <header className="uk-position-relative">
        <div className="uk-position-top">
            <nav className="uk-navbar-container uk-navbar-transparent" data-uk-navbar>
                <div className="uk-navbar-left">
                    <ul className="uk-navbar-nav">
                        <li>
                            <NavLink to={`${match.path}`} exact activeClassName="uk-active">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='users' activeClassName="uk-active">Users</NavLink>
                        </li>
                        <li>
                            <NavLink to='fundraisers' activeClassName="uk-active">Fundraisers</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>
)

export default withRouter(PrimaryHeader);