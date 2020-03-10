import {
  all,
  put,
  takeLatest,
} from 'redux-saga/effects'
import Cookie from 'js-cookie'
import isNil from 'lodash/isNil'

import {
  GET_LECTURER_LIST,GET_REQUEST_APPOINTMENT,
} from '../constants'
import { appointmentAction } from '../actions'
import { getLecturerAPI,getRequestAppointmentAPI } from '../api'


export function* getLecturer() {
  try {
    const token = Cookie.get('token')
    if (!isNil(token)) {
      const { data, error } = yield getLecturerAPI()
      if (error) {
        return
      }
      yield put(appointmentAction.setLecturerList(data.data))
    }
  } catch (error) {
    console.log('error', error)
  }
}

export function* getRequestAppointment(){
try{
  const token = Cookie.get('token')
  if (!isNil(token)) {
    const { data, error } = yield getRequestAppointmentAPI()
    if (error) {
      return

    }
    console.log(data.data)
    yield put(appointmentAction.setRequesAppointmentList(data.data))
  }

}catch(error){

}
}

export function* approveAppointment({ payload }) {
  try {
    const response = yield call(httpPut.post, {
      url: `/api/approveRequest/${payload.id}`,
    })

    const { error } = response
    if (error) {
      return
    }

    yield put(appointmentAction.approveAppointment(payload.id))
  } catch (error) {
    console.log('error', error)
  }
}


export default function* userSaga() {
  yield all([
    takeLatest(GET_LECTURER_LIST, getLecturer),
    takeLatest(GET_REQUEST_APPOINTMENT, getRequestAppointment)
  ])
}

