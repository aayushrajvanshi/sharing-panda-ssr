import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

var store = require('./store/configureStore').configure();

//Styles
import './styles/app.scss';

//Layouts
import PrimaryLayout from './layouts/PrimaryLayout';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                {/* <Route path="/auth" component={UnauthorizedLayout} /> */}
                <Route path="/" component={PrimaryLayout} />
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

