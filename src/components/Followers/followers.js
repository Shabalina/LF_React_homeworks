import React, { PureComponent } from 'react';
import styles from './followers.module.css';
import {getData, getIsLoading} from '../../modules/Followers';
import { connect } from 'react-redux';
import cx from 'classnames';

class Followers extends PureComponent {
  render() {
    const {data, isLoading,error} = this.props;
    if (isLoading) return <p>Загрузка информации о фоловерах</p>;
    if (error) return <p>Произошла сетевая ошибка</p>;   
    // Покажите статус загрузки
    // Если данные не были загружены - сообщите об этом пользователю
    return (
      <div className={cx(styles.root, 't-followers')}>
        {data.length ? 
          data.map(follower => (
          <div key={follower.id} className={styles.follower}>
            <img className={styles.followerImg}
              src={follower? follower.avatar_url : null}
              alt={follower.name}
              >
            </img>
            <p className={styles.followerLogin}>{follower.login}</p>
          </div>
          )) : 
          null
          }
        {/* 
        Отобразите список пользователей.
        Для каждого пользователя покажите имя и аватарку.
      */}
      </div>
    );
  }
}

// Используйте поля data, isLoading из стейта
export default connect(state => ({
    isLoading: getIsLoading(state),
    data: getData(state) 
  }), undefined)(Followers);

