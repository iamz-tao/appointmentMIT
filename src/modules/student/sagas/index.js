import { call } from 'redux-saga/effects'
import appointmentSaga from './appointment-saga'

export default [
  call(appointmentSaga),
]
