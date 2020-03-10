import {
  GET_LECTURER_LIST,
  SET_LECTURER_LIST,
} from '../constants'

export const getLecturerList = payload => ({
  payload,
  type: GET_LECTURER_LIST,
})

export const setLecturerList = payload => ({
  payload,
  type: SET_LECTURER_LIST,
})


