import React from 'react'
import Bond_image from './assets/bond_approve.jpg';
import './Form.css';

const authData= {
  forename: { field: 'James', empty_data_msg: 'Нужно указать имя', wrong_data_msg: 'Имя указано не верно'},
  surname: {field: 'Bond', empty_data_msg: 'Нужно указать фамилию', wrong_data_msg: 'Фамилия указана не верно'},
  password: {field: '007', empty_data_msg: 'Нужно указать пароль', wrong_data_msg: 'Пароль указан не верно'},
}

export default class Form extends React.Component {
  state = {
    forename: '',
    surname: '',
    password: '',
    submitErrs: {},
    isLogin: false      
    }

    inputChange = event => {
      this.setState({
        [event.target.name]: event.target.value.toLowerCase(),
        submitErrs: {}
      })
    }

    checkAuthData = event => {
      event.preventDefault();
      let errors = {}
      for (let key in authData){
        if (this.state[key] === ''){
          errors[key] = authData[key].empty_data_msg
        } else if (this.state[key] !== authData[key].field.toLowerCase()){
          errors[key] = authData[key].wrong_data_msg
        }
      console.log(Object.keys(errors).length)
      this.setState({
        submitErrs: errors,
        isLogin: !Object.keys(errors).length
        });      
      }      
  };

    render() {  
      //const { forename, surname, password, errors, isLogin } = this.state;
      if (!this.state.isLogin){
        return (
          <div className="app-container">
              <form className="form" onSubmit={this.checkAuthData}>
                  <h1>Введите свои данные, агент</h1>
                  <p className="field">
                    <label className="field__label" htmlFor="firstname">
                        <span className="field-label">Имя</span>
                    </label>
                    <input 
                        className="field__input field__input t-input-firstname" 
                        type="text" 
                        name="forename"
                        onChange={this.inputChange}
                    />
                    <span className="field__error field-error t-error-firstname">
                        {this.state.submitErrs.forename}
                    </span>
                  </p>
                  <p className="field">
                      <label className="field__label" htmlFor="surname">
                          <span className="field-label">Фамилия</span>
                      </label>
                    <input 
                        className="field__input field__input t-input-lastname"
                        type="text" 
                        name="surname"
                        onChange={this.inputChange}
                    />
                      <span className="field__error field-error t-error-lastname">
                          {this.state.submitErrs.surname}
                      </span>
                  </p>
                  <p className="field">
                      <label className="field__label" htmlFor="password">
                          <span className="field-label">Пароль</span>
                      </label>
                      <input 
                          className="field__input field__input t-input-password"
                          type="password" 
                          name="password"
                          onChange={this.inputChange}
                      />
                      <span className="field__error field-error t-error-password">
                          {this.state.submitErrs.password}
                      </span>
                  </p>
                  <div className="form__buttons">
                      <input 
                          className="button t-submit" 
                          type="submit" 
                          value="Проверить"
                      />
                  </div>
              </form>
          </div>
        )
      } else {
        return (
          <div className="app-container">
            <img src={Bond_image} alt="Welcome, Bond" className="t-bond-image"></img>
          </div>
        )
      }
    }
  }    
