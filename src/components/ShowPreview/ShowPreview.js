// Реализуйте компонент превью шоу.
// Он должен показывать название, описание и картинку шоу.

import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styles from './ShowPreview.module.css';

class ShowPreview extends Component {

    render(){
        const {show} = this.props   
        return(
            <div className={`${styles.container} t-preview`}>
                <div>
                    <Link 
                        className='t-link'
                        to={`/shows/${show.id}`}
                        >
                        {show.name}
                    </Link>
                    <img
                        src={ show.image? show.image.medium : null}
                        alt={show.name}
                    >
                    </img>
                </div>
                <div
                    dangerouslySetInnerHTML={{__html: show.summary}}
                    >                    
                </div>
            </div>
        )
    }
}

export default ShowPreview;
    