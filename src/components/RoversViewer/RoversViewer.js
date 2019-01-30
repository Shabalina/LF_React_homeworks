// Здесь вам нужно реализовать вью

// Подключите его к редакс роутеру
// Вам потребуются селекторы для получения выбранного сола
// и списка фотографий

// Так же вы будете диспатчить экшены CHANGE_SOL и FETCH_PHOTOS_REQUEST
// Эти экшены находятся в модуле ROVER PHOTOS
import React, { PureComponent } from 'react';
import RoverPhotos from '../RoverPhotos';
import SelectSol from '../SelectSol';
import styles from './RoversViewer.module.css';
import { connect } from 'react-redux';
import { getApiKey } from '../../modules/Auth';
import { getCurrentSol,getMinSol, getMaxSol, roversName,
  changeSol, getRovers, fetchPhotosRequest} from '../../modules/RoverPhotos';

class RoversViewer extends PureComponent {

  componentDidMount(){
    const {fetchPhotosRequest, selectedSol, apiKey} = this.props;
    const sol = selectedSol
    roversName.map(name => fetchPhotosRequest({apiKey, name, sol}))
  }

  solChanging(newValue){
    const {minSol, maxSol, selectedSol, changeSol} = this.props
    if (newValue >= minSol && 
        newValue <= maxSol && 
        newValue !== selectedSol) {
          changeSol(newValue)
        }
  }

  render(){
    const {minSol, maxSol, selectedSol, allRovers} = this.props
    const {changeSol} = this.props
      return(
       <div className={styles.root}>
       
          <SelectSol 
            minSol={minSol} 
            maxSol={maxSol} 
            selectedSol={selectedSol} 
            changeSol={changeSol}
            />
            <div className={styles.root1}>
              {
                roversName.map(rover => {
                  const renderPhotos = allRovers[rover][selectedSol] 
                  ? allRovers[rover][selectedSol].photos
                  : []
                  return (
                  <RoverPhotos key={rover} name={rover} photos={renderPhotos}/>   
                  )                
                }
                )
              }
            </div>
       </div>
      )
    }
  


}


const mapStateToProps = state => ({
  allRovers: getRovers(state),
  maxSol: getMaxSol(state),
  minSol: getMinSol(state),
  selectedSol: getCurrentSol(state),
  apiKey: getApiKey(state)
})

export default connect(
  mapStateToProps,
  {changeSol, fetchPhotosRequest}
)(RoversViewer);

