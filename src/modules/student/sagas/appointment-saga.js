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
  GET_LECTURER_LIST, GET_REQUEST_APPOINTMENT, CREATE_APPOINTMENT, STUDENT_GET_APPOINT_REQ_LIST, CANCEL_APPOINT,
} from '../constants'
import * as httpToken from '~/helpers/axiosWrapperPostToken'
import * as httpPut from '~/helpers/axiosWrapperPut'
import { appointmentAction } from '../actions'
import {
  getLecturerAPI, studentGetAppointReqAPI, cancelAppointmentAPI, getRequestAppointmentAPI,
} from '../api'

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

export function* getRequestAppointment() {
  try {
    const token = Cookie.get('token')
    if (!isNil(token)) {
      const { data, error } = yield getRequestAppointmentAPI()
      if (error) {
        return
      }
      yield put(appointmentAction.setRequesAppointmentList(data.data))
    }
  } catch (error) {

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

export function* studentGetAppointReq() {
  try {
    const token = Cookie.get('token')
    if (!isNil(token)) {
      const { data, error } = yield studentGetAppointReqAPI()
      if (error) {
        return
      }
      yield put(appointmentAction.setAppointReq(data.data))
    }
  } catch (error) {
    console.log('error', error)
  }
}

export function* createAppointment({ payload }) {
  try {
    const { data, role } = payload

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
    if (role === 'ADMIN') {
      window.location.href = '/admin'
    }
    if (role === 'NISIT') {
      window.location.href = '/student'
    }
  } catch (exception) {
    yield put(appointmentAction.createAppointmentFailed({ message: 'Internal Error' }))
  }
}

export function* cancelAppointment({ payload }) {
  try {
    yield cancelAppointmentAPI(payload.id)
  } catch (error) {
    console.log('error', error)
  }
}


export default function* userSaga() {
  yield all([
    takeLatest(GET_LECTURER_LIST, getLecturer),
    takeLatest(GET_REQUEST_APPOINTMENT, getRequestAppointment),
    takeLatest(CREATE_APPOINTMENT, createAppointment),
    takeLatest(STUDENT_GET_APPOINT_REQ_LIST, studentGetAppointReq),
    takeLatest(CANCEL_APPOINT, cancelAppointment),
  ])
}
