import {
  GET_LECTURER_LIST,
  SET_LECTURER_LIST,
  GET_REQUEST_APPOINTMENT,
  SET_REQUEST_APPOINTMENT,
  APPROVE_APPOINTMENT,
  REJECT_APPOINTMENT,
  SUCCESS_APPROVE_APPOINTMENT,
} from '../constants'

export const getLecturerList = payload => ({
  payload,
  type: GET_LECTURER_LIST,
})

export const setLecturerList = payload => ({
  payload,
  type: SET_LECTURER_LIST,
})

export const getRequesAppointmentList = payload => ({
  payload,
  type: GET_REQUEST_APPOINTMENT,
})

export const setRequesAppointmentList = payload => ({
  payload,
  type: SET_REQUEST_APPOINTMENT,
})

export const approveAppointment = payload =>({
  payload,
  type: APPROVE_APPOINTMENT,
})

export const successAppointment = payload =>({
  payload,
  type: SUCCESS_APPROVE_APPOINTMENT,
})

export const rejectAppointment = payload => ({
  payload,
  type: REJECT_APPOINTMENT,
})
