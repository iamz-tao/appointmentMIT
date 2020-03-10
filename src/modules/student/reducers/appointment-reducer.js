import { fromJS } from 'immutable'
import {
  GET_LECTURER_LIST,
  SET_LECTURER_LIST,
  CREATE_APPOINTMENT,
  CREATE_APPOINTMENT_FAILED,
  CREATE_APPOINTMENT_SUCCESS,
} from '../constants'

const initialState = fromJS({
  lecturers: null,
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

    default:
      return state
  }
}
