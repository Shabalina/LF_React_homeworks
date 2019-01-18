import React, { PureComponent } from 'react';
import { Link, Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../Home';
import InboxList from '../InboxList';
import OutboxList from '../OutboxList';
import InboxMail from '../InboxMail';
import OutboxMail from '../OutboxMail';

import styles from './AppRouter.module.css';

const routes = [
    {
      path: "/app",
      exact: true,
      title: () => <h3 className={styles.title}>Home</h3>,
      main: Home
    },
    {
      path: "/app/inbox",
      exact: true,
      title: () => <h3 className={styles.title}>Inbox</h3>,
      main: InboxList
    },
    {
      path: "/app/outbox",
      exact: true,
      title: () => <h3 className={styles.title}>Outbox</h3>,
      main: OutboxList
    },
    {
      path: "/app/outbox/:id",
      title: () => <h3 className={styles.title}>Outbox</h3>,
      main: OutboxMail
    },
    {
      path: "/app/inbox/:id",
      title: () => <h3 className={styles.title}>Inbox</h3>,
      main: InboxMail
    }
  ];

class AppRouter extends PureComponent {

    setActiveClass () {
        const activePath = this.context.router.route.location.pathname
        const pathList = ['/app', '/app/inbox', 'app/outbox']
        var activeClassList = []
        for (var i =0; i < pathList.length; i++){
            activeClassList.push(pathList[i] === activePath ? 'active' : null)
        }
        return activeClassList
        
    }
    
    
    render(){
        var activeClassList = this.setActiveClass()
        return(
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <nav className={styles.nav}>
                        <ul
                        className={[`${styles.navList}`, "t-nav-list"].join(' ')}
                        >
                            <li className={styles.navElement}>
                                <Link 
                                    className={`${styles.link} t-link-home ${activeClassList[0]}`}
                                    to='/app'
                                    //activeClassName="active"
                                    >
                                    Home
                                </Link>
                            </li>
                            <li className={styles.navElement}>
                                <Link 
                                    className={`${styles.link} t-link-inbox ${activeClassList[1]}`}   
                                    to='/app/inbox'
                                    //activeClassName="active"
                                    >
                                    Inbox
                                </Link>
                            </li>
                            <li className={styles.navElement}>
                                <Link 
                                    className={`${styles.link} t-link-outbox ${activeClassList[2]}`}
                                    to='/app/outbox'
                                   // activeClassName="active"
                                    >
                                    Outbox
                                </Link>
                            </li>
                        </ul>                   
                    </nav>
                    <div className={styles.content}>
                        {routes.map((route, index) => (
                            <Route
                              key={index}
                              path={route.path}
                              exact={route.exact}
                              component={route.title}
                            />
                         ))}
                         <Switch>
                            {routes.map((route, index) => (
                                <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.main}
                                />
                            ))}
                         </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

AppRouter.contextTypes = {
    router: PropTypes.object
};


export default AppRouter;


// Реализуйте роутер приложения.
// Здесь должны быть обьявлены роуты,
// которые будут доступны авторизованному пользователю.
// - Home
// - InboxList
// - InboxMail
// - OutboxList
// - OutboxMail

// Так же в этом файле обьявите лейаут,
// используйте стили из AppRouter.module.css
