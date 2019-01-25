import React, { PureComponent } from 'react';
import styles from './UserInfo.module.css';
import {getIsLoading,getData, getError} from '../../modules/User';
import { connect } from 'react-redux';

class UserInfo extends PureComponent {
  render() {

    const {data, isLoading,error} = this.props;
    if (isLoading) return <p>Загрузка информации о пользователе</p>;
    if (error) return <p>Произошла сетевая ошибка</p>;   
    // Покажите статус загрузки
    // Если данные не были загружены - сообщите об этом пользователю
    if (data.login) {
      return (
        <div className={styles.root}>      
          <div className={styles.imageWrapper}>
            <img className={styles.image}
              src={data? data.avatar_url : null}
              alt={data.name}
              >
            </img>
          </div>
          <div>
            <p className='t-user-name'>{data.login}</p>
            <p className='t-user-bio'>{data.bio}</p>
          </div>      
        </div>      
      )} else {
        return null;
      }
  }
}

// Используйте поля data, isLoading из стейта
export default connect(state => ({
  isLoading: getIsLoading(state),
  data: getData(state),
  error: getError(state)  
}), undefined)(UserInfo);
