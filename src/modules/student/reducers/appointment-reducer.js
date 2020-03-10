import { fromJS } from 'immutable'
import {
  GET_LECTURER_LIST,
  SET_LECTURER_LIST,
  CREATE_APPOINTMENT,
  CREATE_APPOINTMENT_FAILED,
  CREATE_APPOINTMENT_SUCCESS,
  STUDENT_GET_APPOINT_REQ_LIST,
  STUDENT_SET_APPOINT_REQ_LIST,
  CANCEL_APPOINT,
  CANCEL_APPOINT_SUCCESS,
} from '../constants'

const initialState = fromJS({
  lecturers: null,
  studentAppointment: null,
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
      .removeIn(['studentAppointment','appoints', index])
        .set('isFetching', false)
    }

    default:
      return state
  }
}
