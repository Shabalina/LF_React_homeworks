// Реализуйте редьюсер
// Файл с тестами RoverPhotos.test.js поможет вам в этом

// Реализуйте редьюсер
import { combineReducers } from 'redux';
import { handleActions} from 'redux-actions';
import {changeSol, fetchPhotosRequest, fetchPhotosSuccess, fetchPhotosFailure} from './actions';


const sol = handleActions(
    {[changeSol]:(_state, action) => ({..._state, current:action.payload })},
    {
        max: 3,
        min: 1,
        current: 1
    })

export const roversName = ['curiosity', 'opportunity', 'spirit'];
    
const photos = combineReducers(
    roversName.reduce((pv, rover) => {
      pv[rover] = handleActions(  
        {
          [fetchPhotosRequest]:(_state, action) => {
          var { name, sol } = action.payload;
          return name === rover 
              ? { ..._state,
                   [sol]:{
                        isLoading: true,
                        photos:[],
                        isLoaded:false
                      }
                    }
                : _state
              },
                  
            [fetchPhotosSuccess]:(state, action) => {
              var { name, sol, photos } = action.payload;
              return name === rover 
                  ? { ...state,
                      [sol]:{
                          isLoading: false,
                          photos,
                          isLoaded:true
                        }
                      }
                  : state
                    },
                
    [fetchPhotosFailure]:(_state, {payload: {name, sol, error}}) => {
          return name === rover 
          ? { ..._state,
              [sol]:{
                  isLoading: false,
                  error,
                  isLoaded:true
                }
              }
          : _state
            }
        },
        {}
    );
    return pv
  }, {})
)


export default combineReducers({
  sol,
  photos
})

export const getCurrentSol = state => state.roverPhotos.sol.current
export const getMaxSol = state => state.roverPhotos.sol.max;
export const getMinSol = state => state.roverPhotos.sol.min;
export const getRovers = state => state.roverPhotos.photos;
export const isRoverHasPhotosForSol = ( state, name, sol) => {
  //console.log('isRoverHasFotosforsol', state, name, sol)
  if (!state.roverPhotos.photos[name][sol]) {
    return false;
  }
  return photos[name][sol].isLoaded;
  }