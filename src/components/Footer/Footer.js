import React, { PureComponent } from 'react';
import { AuthConsumer } from '../../contexts/Auth';
import './Footer.css';

class Footer extends PureComponent {
  state = {    
    logout: "Вы гость в этой системе",
    login: "Вы вошли как "    
    }

  render() {
    const {logout, login} = this.state;
    return (
      <AuthConsumer>
      { ({ isAuthorized, email }) =>        
        <p className="footer-message t-footer">{isAuthorized ? login+email : logout}</p>
      }
    </AuthConsumer>
  )
  }
}

export default Footer;
