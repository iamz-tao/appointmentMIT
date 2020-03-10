import { combineReducers } from 'redux-immutable'
import appointmentReducer from './appointment-reducer'

export default combineReducers({
  appointment: appointmentReducer,
})
