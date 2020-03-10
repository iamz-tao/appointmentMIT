import { fromJS } from 'immutable'
import {
  GET_LECTURER_LIST,
  SET_LECTURER_LIST,
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
   
    default:
      return state
  }
}
