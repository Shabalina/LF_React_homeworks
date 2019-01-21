// Реализуйте роутер
// Вам нужно определить корневой роут, который будет вести на страницу поиска.
// Роут шоу должен принимать id в параметрах.
import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import './AppRouter.css';
import Search from '../Search';
import ShowPage from '../ShowPage';

class AppRouter extends Component {
    
    render(){
        return(
            <div className='App'>
                <Route
                    path='/'
                    exact='true'
                    component={Search}
                />
                <Route
                    path='/shows/:id'
                    component={ShowPage}
                />
            </div>
        )}

    }

    export default AppRouter;