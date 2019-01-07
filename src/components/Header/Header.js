import React, { PureComponent } from 'react';
import { AuthConsumer } from '../../contexts/Auth';
import Button from '../Button'
import './Header.css';

class Header extends PureComponent {
  state = {    
    btnClass: "header-menu__button t-logout",
    innerText: "Выйти"    
    }
  
  render() {
    const {btnClass, innerText} = this.state;
    return (
        <AuthConsumer>
        { ({ isAuthorized, email, logout }) => 

            isAuthorized ? (
                <div className="header-menu">
                  <p className="header-menu__email header-email t-header-email">{email}</p>
                  <Button className={btnClass} children={innerText} onClick={logout}/>
                </div>
              ) : ( 
                null
              )
            }    
      </AuthConsumer>
    )
  }
}

export default Header;
