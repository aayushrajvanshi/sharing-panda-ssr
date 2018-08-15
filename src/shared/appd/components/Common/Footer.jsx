import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './styles/_footer.scss';
import logo from '../../../public/assets/images/sharing-panda-logo.svg';

class Footer extends Component {

    render() {
        return (
            <footer id="footer">
                <div className="uk-section uk-section-primary uk-visible@m">
                    <div className="uk-container">
                        <div className="uk-flex uk-flex-center uk-margin-medium">
                            <div className="footer-list uk-text-center">
                                <p>CONNECT WITH US</p>
                                <ul className="icon-list">
                                    <li><a href="" className="uk-icon-button" data-uk-icon="icon: twitter"></a></li>
                                    <li><a href="" className="uk-icon-button" data-uk-icon="icon: facebook"></a></li>
                                    <li><a href="" className="uk-icon-button" data-uk-icon="icon: google-plus"></a></li>
                                    <li><a href="" className="uk-icon-button" data-uk-icon="icon: whatsapp"></a></li>
                                    <li><a href="" className="uk-icon-button" data-uk-icon="icon: youtube"></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="uk-grid-small uk-flex uk-flex-center" data-uk-grid>
                            <div className="footer-list uk-width-1-5@m">
                                <p>Fundraise</p>
                                <ul className="other-list">
                                    <li> <a href="#">Movie & Film Projects </a></li>
                                    <li> <a href="#">Music Projects</a></li>
                                    <li> <a href="#">Other Entrepreneurial Projects</a></li>
                                    <li> <a href="#">Fundraising for NGOs</a></li>
                                    <li> <a href="#">Personal Causes</a></li>
                                    <li> <a href="#">Crowdfunding for Education</a></li>
                                </ul>
                            </div>
                            <div className="footer-list uk-width-1-5@m">
                                <p>How it works</p>
                                <ul className="other-list">
                                    <li> <a href="#">NGOS</a></li>
                                    <li> <a href="#">Corporates</a></li>
                                    <li> <a href="#">Individuals</a></li>
                                </ul>
                            </div>
                            <div className="footer-list uk-width-1-5@m">
                                <p>About Us</p>
                                <ul className="other-list">
                                    <li><NavLink to="/team-sharing-panda">Team Sharing Panda</NavLink></li>
                                    <li> <a href="#">Our Partners</a></li>
                                    <li> <a href="#">Careers</a></li>
                                    <li> <a href="#">Press Club</a></li>
                                    <li> <a href="#">Blog</a></li>
                                </ul>
                            </div>
                            <div className="footer-list uk-width-1-5@m">
                                <p>Support</p>
                                <ul className="other-list">
                                    <li><NavLink to="/faq">FAQs</NavLink></li>
                                    <li><NavLink to="/fundraising-tips">Fundraising Tips</NavLink></li>
                                    <li><a href="#">Fundraiser Video</a></li>
                                    <li><a href="#">Project Handbook</a></li>
                                    <li><a href="#">Plans & Pricing</a></li>
                                    <li><a href="#">Payouts</a></li>
                                    <li><a href="#">Contact Us</a></li>
                                    <li><a href="#">Trust & Safety</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="uk-section uk-section-primary uk-margin-remove uk-padding" style={{ 'backgroundColor': 'rgba(0,0,0,1)' }}>
                    <div className="uk-container">
                        <div className="uk-light">
                            <a className="uk-logo" href="">
                                <img src={logo} style={{ 'filter': 'invert(100%)' }} width="180" height="50" alt="" data-uk-svg />
                            </a>
                        </div>
                        <div className="uk-clearfix">
                            <div className="uk-grid-small uk-flex-inline">
                                <div className="uk-float-left">
                                    <p className="uk-text-center" style={{ 'fontSize': '0.7rem' }}>Terms of Use | Privacy Policy | 2017 | All Rights Reserved</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer >
        );
    }
}

export default Footer;