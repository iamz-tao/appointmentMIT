import {
  all,
  put,
  takeLatest,
  call,
} from 'redux-saga/effects'
import Cookie from 'js-cookie'
import isNil from 'lodash/isNil'
import Router from 'next/router'

import {
  GET_LECTURER_LIST, CREATE_APPOINTMENT,
} from '../constants'
import * as httpToken from '~/helpers/axiosWrapperPostToken'
import { appointmentAction } from '../actions'
import { getLecturerAPI } from '../api'

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

export function* createAppointment({ payload }) {
  try {
    const { data } = payload

    const response = yield call(httpToken.post, {
      url: '/api/postAppointMent',
      payload: {
        ...data,
      },
    })

    const { error } = response
    if (error) {
      yield put(appointmentAction.createAppointmentFailed({ message: response.message || 'Error has been occured' }))
      return
    }
    yield put(appointmentAction.createAppointmentSuccess(response.data))
    Router.replace('/student')
  } catch (exception) {
    yield put(appointmentAction.createAppointmentFailed({ message: 'Internal Error' }))
  }
}


export default function* userSaga() {
  yield all([
    takeLatest(GET_LECTURER_LIST, getLecturer),
    takeLatest(CREATE_APPOINTMENT, createAppointment),
  ])
}
