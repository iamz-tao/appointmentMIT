import { fromJS } from 'immutable'
import {
  GET_LECTURER_LIST,
  SET_LECTURER_LIST,
  GET_REQUEST_APPOINTMENT,
  SET_REQUEST_APPOINTMENT,
  CREATE_APPOINTMENT,
  CREATE_APPOINTMENT_FAILED,
  CREATE_APPOINTMENT_SUCCESS,
  STUDENT_GET_APPOINT_REQ_LIST,
  STUDENT_SET_APPOINT_REQ_LIST,
  CANCEL_APPOINT,
  CANCEL_APPOINT_SUCCESS,
  APPROVE_APPOINTMENT,
  APPROVE_APPOINTMENT_SUCCESS,
  APPROVE_APPOINTMENT_FAILED,
  REJECT_APPOINTMENT,
  REJECT_APPOINTMENT_SUCCESS,
  REJECT_APPOINTMENT_FAILED,
  GET_APPOINT_TEACHER,
  SET_APPOINT_TEACHER,
} from '../constants'

const initialState = fromJS({
  appointmentTeacher: null,
  lecturers: null,
  requestAppointment: null,
  studentAppointment: null,
  isFetching: false,
})

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_LECTURER_LIST: {
      return state
        .set('isFetching', true)
    }

    case SET_LECTURER_LIST: {
      return state
        .set('lecturers', fromJS(payload))
        .set('isFetching', false)
    }
    case GET_REQUEST_APPOINTMENT: {
      return state
        .set('isFetching', true)
    }
    case SET_REQUEST_APPOINTMENT: {
      return state
        .set('requestAppointment', fromJS(payload))
        .set('isFetching', false)
    }

    case CREATE_APPOINTMENT: {
      return state
        .set('isFetching', true)
    }

    case CREATE_APPOINTMENT_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('errorMessage', payload.message)
    }

    case CREATE_APPOINTMENT_FAILED: {
      return state
        .set('isFetching', false)
        .set('status', 400)
        .set('payload', payload)
    }

    case STUDENT_GET_APPOINT_REQ_LIST: {
      return state
        .set('isFetching', true)
    }

    case STUDENT_SET_APPOINT_REQ_LIST: {
      return state
        .set('studentAppointment', fromJS(payload))
        .set('isFetching', false)
    }

    case CANCEL_APPOINT: {
      return state
        .set('isFetching', true)
    }

    case CANCEL_APPOINT_SUCCESS: {
      const index = state.getIn(['studentAppointment']).get('appoints')
        .findIndex(rec => rec.get('request_id') === payload)
      return state
        .removeIn(['studentAppointment', 'appoints', index])
        .set('isFetching', false)
    }

    case APPROVE_APPOINTMENT: {
      return state
        .set('isFetching', true)
    }

    case APPROVE_APPOINTMENT_SUCCESS: {
      const index = state.getIn(['requestAppointment'])
        .findIndex(rec => rec.get('appoint_id') === payload)
      return state
        .setIn(['requestAppointment', index, 'approved_status'], 'APPROVE')
        .set('isFetching', false)
    }

    case APPROVE_APPOINTMENT_FAILED: {
      return state
        .set('isFetching', false)
        .set('status', 400)
        .set('payload', payload)
    }

    case REJECT_APPOINTMENT: {
      return state
        .set('isFetching', true)
    }

    case REJECT_APPOINTMENT_SUCCESS: {
      const index = state.getIn(['requestAppointment'])
        .findIndex(rec => rec.get('appoint_id') === payload)
      return state
        .removeIn(['requestAppointment', index])
        .set('isFetching', false)
    }

    case REJECT_APPOINTMENT_FAILED: {
      return state
        .set('isFetching', false)
        .set('status', 400)
        .set('payload', payload)
    }

    case GET_APPOINT_TEACHER: {
      return state
        .set('isFetching', true)
    }

    case SET_APPOINT_TEACHER: {
      return state
        .set('appointmentTeacher', fromJS(payload))
        .set('isFetching', false)
    }

    default:
      return state
  }
}
