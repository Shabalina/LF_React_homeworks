// Реализуйте страницу поиска.

// Используйте метод connect и mapStateToProps, mapDispatchToProps,
// чтобы получить ссылку на поле search вашего стейта
// и экшн searchRequest.

import React, { Component } from 'react';
import ShowPreview from '../ShowPreview'
import styles from './Search.module.css';
import { connect } from 'react-redux';

import { searchRequest } from '../../actions/searchActions';


class Search extends Component {
    state={
        searchValue: ''
    }


handleInput= event => {
    this.setState({
        searchValue: event.target.value
    })
}

sendRequest = () => {
    const { searchValue } =  this.state
    const {searchRequest} = this.props
    if (searchValue !== '') {
        searchRequest(searchValue)
    } 
}

render(){
    const {shows, isLoading, error} = this.props
    const { searchValue } =  this.state
    if (isLoading) return <p>Выполняется поиск</p>;
    if (error) return <p>Произошла сетевая ошибка</p>;


        return(
            <div>
                <div className={styles.previewList}>
                    <input 
                        className={`${styles.input} t-input`}
                        value={searchValue}
                        placeholder='Название сериала'
                        onChange={this.handleInput}
                        >
                    </input>
                    <div className={styles.buttonWrapper}>
                        <button 
                            className={`${styles.button} t-search-button`}
                            onClick={this.sendRequest}
                            >
                            Найти
                        </button>
                    </div>                
                </div>
                <div className={`${styles.searchPanel} t-search-result`}>
                    {shows ? 
                        shows.map(show => (
                        <ShowPreview 
                            key={show.id} 
                            show={show}>
                        </ShowPreview>
                        )) : 
                        null
                        }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    shows: state.search.shows,
    isLoading: state.search.isLoading,
    error: state.search.error,
  })
  
  
  const mapDispatchToProps = {
    searchRequest
  }

export default connect(mapStateToProps, mapDispatchToProps)(Search);


