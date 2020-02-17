import { fromJS } from 'immutable'

import {
  CREATE_SUBJECT,
  CREATE_SUBJECT_SUCCESS,
  CREATE_SUBJECT_FAILED,
  SET_TO_SUBJECTS,
  APPROVE_SUBJECT,
  APPROVE_SUBJECT_SUCCESS,
  REJECT_SUBJECT,
  REJECT_SUBJECT_SUCCESS,
  APPROVE_SUBJECTS,
  REJECT_SUBJECTS,
  SET_SUBJECT_PROFESSOR,
  OPEN_SECTION,
  OPEN_SECTION_SUCCESS,
  OPEN_SECTION_FAILED,
  DELETE_SECTION_SUCCESS,
  DELETE_SUBJECT_SUCCESS,
  SET_SUBJECT,
  UPDATE_SUBJECT_SUCCESS,
  SET_SECTION,
  UPDATE_SECTION_SUCCESS,
} from '../constants'

const initialState = fromJS({
  subjects: null,
  subject: null,
  professor: {
    subjects: null,
    section: null,
  },
  httpState: {
    isFetching: false,
    message: '',
  },
})

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_SUBJECT:
      return state
        .set('isFetching', true)
    case CREATE_SUBJECT_SUCCESS:
      return state
        .setIn(['httpState', 'isFetching'], false)
    case OPEN_SECTION:
      return state
        .set('isFetching', true)
    case OPEN_SECTION_SUCCESS:
      return state
        .setIn(['httpState', 'isFetching'], false)
    case CREATE_SUBJECT_FAILED: {
      return state
        .set('isFetching', false)
        .set('status', 400)
        .set('payload', payload)
    }
    case OPEN_SECTION_FAILED: {
      return state
        .set('isFetching', false)
        .set('status', 400)
        .set('payload', payload)
    }
    case SET_TO_SUBJECTS:
      return state
        .set('subjects', fromJS(payload))
        .set('isFetching', true)
    case APPROVE_SUBJECT:
      return state
        .setIn(['httpState', 'isFetching'], true)
    case APPROVE_SUBJECT_SUCCESS:
      return state
        .setIn(['httpState', 'isFetching'], false)
    case REJECT_SUBJECT:
      return state
        .setIn(['httpState', 'isFetching'], true)
    case REJECT_SUBJECT_SUCCESS:
      return state
        .setIn(['httpState', 'isFetching'], false)
    case APPROVE_SUBJECTS:
      return state
        .setIn(['httpState', 'isFetching'], true)
    case REJECT_SUBJECTS:
      return state
        .setIn(['httpState', 'isFetching'], false)
    case SET_SUBJECT_PROFESSOR: {
      return state
        .setIn(['professor', 'subjects'], fromJS(payload))
        .set('isFetching', true)
    }
    case DELETE_SECTION_SUCCESS: {
      const removeIndex = state.getIn(['professor', 'subjects']).findIndex(rec => rec.get('id') === payload)
      return state
        .removeIn(['professor', 'subjects', removeIndex])
        .setIn(['httpState', 'isFetching'], false)
    }
    case DELETE_SUBJECT_SUCCESS: {
      const removeIndex = state.getIn(['subjects']).findIndex(rec => rec.get('id') === payload)
      return state
        .removeIn(['subjects', removeIndex])
        .setIn(['httpState', 'isFetching'], false)
    }
    case SET_SUBJECT: {
      return state
        .setIn(['subject'], fromJS(payload))
        .set('isFetching', true)
    }
    case UPDATE_SUBJECT_SUCCESS: {
      const { id, subject_code, subject_name } = payload
      const subjectIndex = state.getIn(['subjects'])
        .findIndex(rec => rec.get('id') === id)
      return state
        .setIn(['subjects', subjectIndex, 'subject_code'], subject_code)
        .setIn(['subjects', subjectIndex, 'subject_name'], subject_name)
        .setIn(['httpState', 'isFetching'], false)
    }
    case SET_SECTION: {
      return state
        .setIn(['professor', 'section'], fromJS(payload))
    }
    default:
      return state
  }
}
