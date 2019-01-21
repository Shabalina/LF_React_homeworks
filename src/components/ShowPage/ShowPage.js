// Реализуйте страницу шоу.

// Используйте метод connect и mapStateToProps, mapDispatchToProps,
// чтобы получить ссылку на поле show вашего стейта
// и экшн showRequest.

// В методе componentDidMount вам нужно будет диспатчить showRequest action

import React, { PureComponent } from 'react';
import styles from './ShowPage.module.css';
import { connect } from 'react-redux';
import {showRequest} from '../../actions/showActions';


class ShowPage extends PureComponent {

    componentDidMount() {
        const {
            match: {
                params: { id }
            }
        }= this.props
        const { showRequest } = this.props;
        showRequest(id);
        }

    render(){
        const {show, isLoading, error} = this.props;
        if (isLoading) return <p>Выполняется поиск</p>;
        if (error) return <p>Произошла сетевая ошибка</p>;   
            
        return(
            <div>
                <p>{show.name}</p>
            <img
                src={ show.image? show.image.medium : null}
                alt={show.name}
                >
            </img>
            <div
                dangerouslySetInnerHTML={{__html: show.summary}}
                >                    
            </div> 
            <div className={styles.cast}>
            {show._embedded ?                     
                    show._embedded.cast.map(actor => (
                    <div 
                        key={`${show.id}+${actor.person.id}`}
                        className='t-person' 
                    >
                        <p>{actor.person.name}</p>
                        <img
                            src={ actor.person.image? actor.person.image.medium : null}
                            alt={actor.person.name}
                        >
                        </img>
                    </div>
                    )) : null
                }
            </div>
            </div>
    )}
}

const mapStateToProps = state => ({
    show: state.shows.show,
    isLoading: state.shows.isLoading,
    error: state.shows.error,
  })
  
  const mapDispatchToProps = {
    showRequest
  }

export default connect(mapStateToProps, mapDispatchToProps)(ShowPage);



