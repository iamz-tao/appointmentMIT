import {
  GET_LECTURER_LIST,
  SET_LECTURER_LIST,
  CREATE_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_FAILED,
  CREATE_APPOINTMENT,
} from '../constants'

export const getLecturerList = payload => ({
  payload,
  type: GET_LECTURER_LIST,
})

export const setLecturerList = payload => ({
  payload,
  type: SET_LECTURER_LIST,
})

export const createAppointment = payload => ({
  payload,
  type: CREATE_APPOINTMENT,
})

export const createAppointmentSuccess = payload => ({
  payload,
  type: CREATE_APPOINTMENT_SUCCESS,
})

export const createAppointmentFailed = payload => ({
  payload,
  type: CREATE_APPOINTMENT_FAILED,
})

