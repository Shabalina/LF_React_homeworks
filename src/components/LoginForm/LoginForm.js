import React, { Component } from 'react';
import { withAuth } from '../../context/Auth';
import { Route, Redirect } from 'react-router-dom';
import styles from './LoginForm.module.css';


class LoginForm extends Component {
    state={
        email: '',
        password:''
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value.toLowerCase(),            
        });
      };

    handleSubmit = () =>{
        const {email,password} = this.state 
        const {authorize} = this.props
        return authorize(email, password)
    }    

    render(){
        console.log('in login')
        const {email,password} = this.state
        //const {getProviderValue} = this.props
        const {isAuthorized, authorize, authError} = this.props  
        console.log(isAuthorized, authError)     
        return(
        !isAuthorized ? (
            <div className={styles.bg}>
                <div className={`${styles.form} t-form`}>
                    <p key="email">
                        <label htmlFor="email">
                            <span className={styles.labelText}>Почта</span>
                        </label>
                        <input 
                            type ="text" 
                            name="email" 
                            className={`${styles.input} t-input-email`}
                            value={email}
                            onChange={this.handleChange}
                            >
                        </input>
                    </p>
                    <p key="password">
                        <label htmlFor="password">
                            <span className={styles.labelText}>Пороль</span>
                        </label>
                        <input 
                            type ="password" 
                            name="password" 
                            className={`${styles.input} t-input-password`}
                            value={password}
                            onChange={this.handleChange}
                            >
                        </input>
                    </p>
                    {authError ? this.renderError() : null}        
                    <div className={styles.buttons}>
                        <button 
                            className={`${styles.button} t-login`}
                            onClick={this.handleSubmit}
                            >
                            Войти
                        </button>
                    </div>                    
                </div>
            </div>
        ) : (
            <Redirect to="/app"/>
        )

     ) 
    }

    renderError() {
        return(
            <p className="error">Почта или пороль не верные</p>
        )
    }

}

export default withAuth(LoginForm);

// Реализуйте компонент формы логина.
// Используйте `/contexts/Auth` для получения метода authorize
// и статуса isAuthorized.

// Когда пользователь авторизован - перенаправьте его на роут /app
