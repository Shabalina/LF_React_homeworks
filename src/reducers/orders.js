import { CREATE_NEW_ORDER } from '../modules/clients';
import { MOVE_ORDER_NEXT, MOVE_ORDER_BACK } from '../actions/moveOrder';
import { ADD_INGREDIENT } from '../actions/ingredients';

// Реализуйте редьюсер
// Типы экшенов, которые вам нужно обрабатывать уже импортированы
// Обратите внимание на `orders.test.js`.
// Он поможет понять, какие значения должен возвращать редьюсер.

const orderStep = ['clients', 'conveyor_1', 'conveyor_2', 'conveyor_3', 'conveyor_4', 'finish']

export default (state = [], action) => {
  switch (action.type) {
    case CREATE_NEW_ORDER:      
      return [
        ...state,
        {id:state.length+1, recipe: action.payload.recipe, ingredients:[], position: "clients"}
      ]
      case MOVE_ORDER_NEXT:
        const updatedNextOrders = state.map(order => {
          if(parseInt(order.id) === action.payload){
            var newPosition = order.position
            if (order.position === 'conveyor_4' && order.ingredients.length === order.recipe.length){
              newPosition = 'finish'
            } else {
              for (var i=0; i< orderStep.length-2; i++){
                if (orderStep[i] === order.position){
                  newPosition = orderStep[i+1]
                  break
                }                  
              }
            }  
            return { ...order, position: newPosition }
          }
          return order
        })
    return updatedNextOrders
      case MOVE_ORDER_BACK:
        const updatedPrevOrders = state.map(order => {
          if(parseInt(order.id) === action.payload){
            var newPosition = order.position
            for (var i=2; i< orderStep.length; i++){
                if (orderStep[i] === order.position){
                  newPosition = orderStep[i-1]
                  break
                }
            }
            return { ...order, position: newPosition }
          }
          return order
        })
        return updatedPrevOrders
      case ADD_INGREDIENT:
        var actviveOrder = 0
        console.log('here')
        for (var i=0; i< state.length; i++){
          if (state[i].position === action.payload.from ){
            actviveOrder = state[i].id
            break
          }
        }        
        const updatedIngredOrders = state.map(order => {

              if (parseInt(order.id) === actviveOrder 
                  && order.recipe.includes(action.payload.ingredient)
                  && !order.ingredients.includes(action.payload.ingredient)){
                    return { ...order, ingredients: [...order.ingredients, action.payload.ingredient] }
                  }
            return order
          })
        return updatedIngredOrders
    default:
      return state;
  }
};

export const getOrdersFor = (state, position) =>
  state.orders.filter(order => order.position === position);
