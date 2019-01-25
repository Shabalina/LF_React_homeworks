import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import Login from '../Login';
import Search from '../Search';

export default () => (
<BrowserRouter>
    <Switch>          
        <Route
            path="/"
            exact
            component={Login}
        />
        <PrivateRoute
            path="/search"
            component={Search}
        />
        <Redirect to="/"/>    
    </Switch>
</BrowserRouter>
  );

// Реализуйте роутер

// Вам потребуется использовать PrivateRoute
