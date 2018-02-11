import { combineReducers } from 'redux'
import About from './AboutReducer'
import Player from './PlayerReducer'

const  rootReducer = combineReducers({
    about: About,
    player: Player

})

export default rootReducer