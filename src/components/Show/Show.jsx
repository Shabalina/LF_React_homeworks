import React, { PureComponent } from 'react';
import {getShowInfo} from '../../api'
import './Show.css';

class Show extends PureComponent {
    state = {
        showId: "",
        data: {}
    };

createMarkup(summary) {
    return {__html: summary};
}

componentDidUpdate(){  
    if (this.state.showId !== this.props.showId) {        
        getShowInfo(this.props.showId).then(jsonData => {
                
                console.log(jsonData.name)
                this.setState({                    
                        showId: this.props.showId,
                        data: jsonData
                    })                                
            })  
    } else {
        return null;
    }
}            
        
render() {
    const { showId, data} = this.state;            
        return showId === '' ? ( 
            <p className="show-inforation t-show-info">
                Шоу не выбрано
            </p>
        ) : (
            <div className="Show">
                <img 
                    className="show-image" 
                    src= {data.image.original} 
                    alt={data.name}>
                </img>
                <h2 className="show-label t-show-name">{data.name}</h2>
                <p className="show-text t-show-genre">
                    <b>Жанр: </b>
                    {data.genres.reduce((acc, curValue) => {
                        return acc+ ", " + curValue;
                    })
                    }
                </p> 
                <p 
                    className="show-text t-show-summary" 
                    dangerouslySetInnerHTML={this.createMarkup(data.summary)}
                />
            </div>
        )
    }
}

export default Show;



