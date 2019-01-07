import React, { PureComponent } from 'react';

const { Provider, Consumer: AuthConsumer } = React.createContext('');

class AuthProvider extends PureComponent {

  state = {
    email: 'stu@dent.com',
    password: '123',    
    authorizeError: '',
    isAuthorized: false,
  };

  getProviderValue (){
    const {authorizeError, isAuthorized, email} = this.state;
    return {
      authorizeError, 
      isAuthorized, 
      email, 
      authorize: this.authorize,
      logout: this.logout
    }
  }

  authorize = (authObj) => {    
    let error = ''
    Object.keys(authObj).forEach(key => {
      //console.log(authObj, this.state[key], authObj[key])
      if (authObj[key] !== this.state[key]){
        error = 'Email или пароль введён не верно'        
      }
    });

    //console.log(authObj, error)

    this.setState({
        authorizeError: error,
        isAuthorized: error === ''
        })
  } 

  logout = () => {
    this.setState({
      isAuthorized: false
      });
  }


  render() {
    const { children } = this.props;
    return (
      <Provider
       value={this.getProviderValue()}
      >
        {children}
      </Provider>)
  }
}

const TestProvider = Provider;

export { AuthProvider, AuthConsumer, TestProvider };
