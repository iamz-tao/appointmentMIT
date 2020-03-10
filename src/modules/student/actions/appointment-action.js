import {
  GET_LECTURER_LIST,
  SET_LECTURER_LIST,
  CREATE_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_FAILED,
  CREATE_APPOINTMENT,
  STUDENT_GET_APPOINT_REQ_LIST,
  STUDENT_SET_APPOINT_REQ_LIST,
  CANCEL_APPOINT,
  CANCEL_APPOINT_SUCCESS,
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

export const getAppointReq = payload => ({
  payload,
  type: STUDENT_GET_APPOINT_REQ_LIST,
})

export const setAppointReq = payload => ({
  payload,
  type: STUDENT_SET_APPOINT_REQ_LIST,
})

export const cancelAppointment = payload => ({
  payload,
  type: CANCEL_APPOINT,
})

export const cancelAppointmentSuccess = payload => ({
  payload,
  type: CANCEL_APPOINT_SUCCESS,
})